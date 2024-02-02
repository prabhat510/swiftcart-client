import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mailSentSuccessfully = false;
  errorMessage = "";
  loginInProgress = false;
  resetLinkInProgress = false;
  loginForm = {
    username: '',
    password: ''
  };
  resetPasswordForm = {
    email: ""
  };
  successMessage = "";
  loginFlow = true;
  resetPasswordFlow = false;
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  loginUser(usrForm: NgForm) {
    this.loginInProgress = true;
    if(usrForm.status === "VALID") {
      this.authService.loginUser(this.loginForm)
      .subscribe({
        next: (res: any)=>{
          console.log('login success::', res)
          this.authService.setUserData(res);
          this.createUserCart();
          window.location.href = '/';
        },
        error: (error)=>{
          this.loginInProgress = false;
          this.errorMessage = "please check your credentials!";
          console.log('error loggin in::', error)
        }
      })
    }
  }

  createUserCart() {
    this.cartService.createUserCart({}).subscribe({
      next:  (res)=>console.log("cart created successfully"),
      error: (error)=>{console.log("cart already exists")}
    })
  }

  handleForgotPassword() {
    this.loginFlow = false;
    this.resetPasswordFlow = true;
  }


  sendResetPasswordRequest(form: NgForm) {
    this.errorMessage = "";
    this.successMessage = "";
    this.resetLinkInProgress = true;
    if(form.valid) {
      const request = {
        email: this.resetPasswordForm.email
      }
      this.authService.sendResetPasswordEmail(request).subscribe(
        (res:any)=>{
          this.resetLinkInProgress = false;
          this.mailSentSuccessfully = true;
          this.successMessage = "Please check your email to reset your password";
          console.log("request send successfully");
        },
        (err:any)=>{
          this.resetLinkInProgress = false;
          this.errorMessage = "This email is not registered with us";
          console.log("cannot reset password", err);
        }
      )
    } else {
      alert("invalid form");
    }
  }

  reset() {
    this.errorMessage = "";
    this.successMessage = "";
    this.mailSentSuccessfully = false;
    this.loginFlow = true;
    this.resetPasswordFlow = false;
  }
}
