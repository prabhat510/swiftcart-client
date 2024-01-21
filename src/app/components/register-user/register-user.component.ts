import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registrationInProgress = false;
  errorMessage = "";
  userForm = {
    name: '',
    username: '',
    password: '',
    email: '',
    mobile: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  submitForm(usrForm: NgForm) {
    this.registrationInProgress = true;
    if(usrForm.status === "VALID") {
      this.authService.registerUser(this.userForm)
      .then(
        (res: any)=>{
          console.log('registration success::', res);
          this.router.navigate(['/login']);
        }
      ).catch((error=>{
        this.registrationInProgress = false;
        this.errorMessage =  JSON.parse(error.message)['message'];
        console.log('registration failed::', error.status, JSON.parse(error.message)['message']);
      }))
    } else {
      alert('please fill all the fields properly');
    }
  }
}
