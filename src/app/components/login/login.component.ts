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
  errorMessage = "";
  loginInProgress = false;
  loginForm = {
    username: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  submitForm(usrForm: NgForm) {
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
}
