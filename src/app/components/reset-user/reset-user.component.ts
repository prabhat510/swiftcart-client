import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-user',
  templateUrl: './reset-user.component.html',
  styleUrls: ['./reset-user.component.scss']
})
export class ResetUserComponent implements OnInit {
  userForm = {
    password: ""
  };
  user: any;
  userId:string;
  errorMessage = "";
  successMessage = "";
  resetSuccessfull = false;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const queryParam = this.route.snapshot.queryParamMap;
    this.userId = queryParam.get("user");
    if (!this.userId) {
      this.router.navigate(['']);
    } else {
      const params = {
        id: this.userId
      };
      this.authService.checkUserValidity(params).subscribe(
        {
          next: (res: any) => {
            console.log("valid user", res);
          }, error: (err) => {
            this.errorMessage = "oops, the user id is incorrect!";
            console.log("invalid user:", err);
          }
        })
    }
  }

  changePassword(ngForm: NgForm) {
    if(ngForm.valid) {
      this.authService.resetPassword({id: this.userId, password: this.userForm.password})
      .subscribe((res:any)=>{
        console.log("password changed succesfully", res);
        this.resetSuccessfull = true;
        this.successMessage = "password changed succesfully";
      })
    }
  }
}
