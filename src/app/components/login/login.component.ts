import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  submitForm(usrForm: NgForm) {
    console.log(usrForm)
    if(usrForm.status === "VALID") {
      this.authService.loginUser(this.loginForm)
      .subscribe((res: any)=>{
        console.log('login success::', res)
        window.location.href = '/';
        this.createUserCart();
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
