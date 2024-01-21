import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { jwtDecode } from "jwt-decode";

import { getServiceUrl } from '../utils/api.config';
import { CookieService } from './cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    
   }

  registerUser(userPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + '/auth/register';
    return new Promise((resolve, reject)=>{
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(userPayload),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`
        },
      }).then(res=>{
           if (res.ok) {
          resolve(res.json()); // Parse JSON response
        } else {
          res.text().then(errorText=>{
            reject( {status: res.status, message: errorText});
          })
        }
      }).catch(err=>reject(err));
    })
  }

  getUserId():string {
    const user = this.getUserProfile();
    return user ? user.userId : '';
  }

  refreshTokens(): Promise<string> {
    return new Promise((resolve, reject)=>{
      const refreshToken = this.getRefreshToken();
      if(refreshToken) {
        this.getNewAccessToken({token: refreshToken})
        .subscribe({
          next: (res)=>{
            this.setUserData(res);
            resolve("success");
          },
          error: (error)=>{
            console.log(error);
            reject("failed");
          } 
        })
      } else {
        reject("failed");
      }
    })
  }

  public get isLoggedIn() {
    // when the token is present and it has not expired then user is logged in 
    const accessToken = this.getAccessToken();
    console.log('accessToken is', accessToken);
    if(accessToken) {
      const decode = jwtDecode(accessToken);
      const tokenExpiry = decode.exp * 1000;
      const currentTime = Date.now();
      if(tokenExpiry > currentTime) {
        console.log('token is valid');
        return true;
      }
    }
    console.log('token has expired::', accessToken);
    return false;
  }

  getUserProfile(): any {
    if (!this.user) {
      const token = this.getAccessToken();
      if (token) {
        this.user = jwtDecode(token);
      }
    }
    return this.user;
  }

  setUserData(data: any) {
    if(data) {
      this.cookieService.setCookie('token', data.accessToken);
      this.cookieService.setCookie('refresh_token', data.refreshToken);
    }
  }

  clearUserSession() {
    this.cookieService.deleteAllCookies();
  }

  getAccessToken() {
    return this.cookieService.getCookie("token");
  }

  getRefreshToken() {
    return this.cookieService.getCookie('refresh_token');
  }

  getNewAccessToken(data: any) {
    const url = `${getServiceUrl().authApiEndpoint}/token`;
    return this.httpClient.post(url, data);
  }

  loginUser(user: object) {
    const url = `${getServiceUrl().authApiEndpoint}/login`;
    return this.httpClient.post(url, user);
  }

  logoutUser(data: any) {  
    const url = `${getServiceUrl().authApiEndpoint}/logout`;
    // always subscribe to the observables, if they are not subscribed request is not send to the server
    return this.httpClient.delete(url, {body: data, responseType: 'text'});
  }
}
