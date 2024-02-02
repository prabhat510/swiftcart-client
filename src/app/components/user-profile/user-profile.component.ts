import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loading = true;
  message = "";
  user:any;
  email:string;
  mobile:string;
  name:string;
  address:string;
  editingEmail = false;
  editingName = false;
  editingMobile = false;
  editingAddress = false;
  updateRequestInProgress = false;
  showTopNotification = false;
  updateRequestSuccess:boolean;
  constructor(private authService: AuthService) { }

  ngOnInit( ): void {
    this.getUserProfile();
  }

  editInfo(data:string, displayValue: boolean) {
    if(data === "name") {
      this.editingName = displayValue;
    } else if(data === "email") {
      this.editingEmail = displayValue;
    } else if(data === "mobile") {
      this.editingMobile = displayValue;
    } else if(data === "address") {
      this.editingAddress = displayValue;
    }
  }

  getUserProfile() {
    this.authService.getUserProfileInfo().subscribe(
      (res:any) => {
        if(res) {
          this.user = res;
          this.email = res.email;
          this.mobile = res.mobile;
          this.name = res.name;
          this.address = res.address;
          this.loading = false;
          console.log("user::", this.user);
        }
      }
    )
  }

  updateUserDetails(data: any) {
    this.updateRequestInProgress = true;
    let payload;
    if(data === "name") {
      payload = {name: this.name};
    } else if(data === "email") {
      payload = {email: this.email};
    } else if(data === "mobile") {
      payload = {mobile: this.mobile};
    } else if(data === "address") {
      payload = {address: this.address};
    }
    console.log("payload::", payload, data);
    this.authService.updateUserProfile(payload).subscribe({
      next: (res:any)=>{
        console.log("updated details", res);
        this.reset();

        this.message = "your details have been successfully updated!";
        this.showTopNotification = true;
        this.updateRequestSuccess = true;
      },
      error: (err:HttpErrorResponse)=>{
        if(err.status === 409) {
          console.log("errr", err);
          this.message = err.error.message;
          this.showTopNotification = true;
          this.updateRequestSuccess = false;
          this.getUserProfile();
          this.reset();
        }
      }
    })
  }

  reset() {
    this.editingEmail = false;
    this.editingMobile = false;
    this.editingName = false;
    this.editingAddress = false;
    this.updateRequestInProgress = false;
  }
}
