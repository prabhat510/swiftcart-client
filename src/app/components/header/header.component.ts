import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchKey:string = "";
  isLoggedin = false;
  cartItemsCount = 0;
  userName = "";
  showMenu = false;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  constructor(private authService: AuthService,
    private productService: ProductService, 
    private cartService: CartService, 
    private router: Router) { }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      // Close the menu when clicking outside of it
      if (!this.menu.nativeElement.contains(event.target) && !this.toggleButton.nativeElement.contains(event.target)) {
        this.showMenu = false;
      }
    }

  ngOnInit(): void {
    this.cartService.cartUpdateSubject.subscribe((res: number)=>{
      this.cartItemsCount = this.cartItemsCount + res;
      console.log("cart item in observer", this.cartItemsCount);
    })
    this.isLoggedin = this.authService.isLoggedIn;
    console.log("isLoggedin::", this.isLoggedin);
    const userId = this.authService.getUserId();
    if(userId) {
      this.fetchCartItemsCount();
      this.userName = this.authService.getUserProfile().username;
    }
  }

    
  search() {
    if(this.searchKey.length > 0){
      this.productService.searchTerm.next(this.searchKey);
    }
  }

  logout() {
    const token = this.authService.getRefreshToken();
    if(token) {
      this.authService.logoutUser({token: token})
      .subscribe((res)=>{
        console.log("logged out successfully", res);
        this.authService.clearUserSession();
        window.location.reload();
      });
    } else {
      this.authService.clearUserSession();
      this.router.navigate(['/']);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
   
  }

  fetchCartItemsCount() {
    this.cartService.getCartItemsCount()
    .subscribe((res: any)=>{
      console.log("items in cart::", res);
      this.cartItemsCount = res.count;
      console.log("cart items from api", this.cartItemsCount);
    })
  }

  handleLogin() {
    const refreshToken = this.authService.getRefreshToken();
    if(refreshToken) {
      console.log("login init");
      this.authService.getNewAccessToken({token: refreshToken})
      .subscribe( {
        next: (res) => {
          console.log(res);
          this.authService.setUserData(res);
          window.location.reload();
        },
        error: (e) => {
          console.log("error refreshing the token", e);
          this.authService.clearUserSession();
          this.router.navigate(['/login']);
        },
    }
    )
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
