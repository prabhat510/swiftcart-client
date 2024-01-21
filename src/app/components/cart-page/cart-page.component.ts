import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  items: Array<any> = [];
  userId:string;
  cartItemsTotalPrice = 0;
  totalCartItems = 0;
  loadingItems = true;
  constructor(private cartService: CartService,
    private authService: AuthService)  { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.fetchCartProducts();
  }

  fetchCartProducts() {
    this.cartService.getAllProductsInCart()
    .subscribe((res:any)=>{
      this.loadingItems = false;
      this.items = res.data?.items;
      this.cartItemsTotalPrice = 0;
      console.log("items:::", res);
      for(const item of this.items) {
        if(item && item.product) {
          this.cartItemsTotalPrice += item.product.price * item.quantity;
        }
        this.totalCartItems += item.quantity;
      }
      console.log('cart response', res, this.items);
    })
  }

  updateTotalPrice(event: any) {
    console.log('update event recieved', event);
    if(event.action === 'added') {
      this.cartItemsTotalPrice += event.price;
    } else if(event.action === 'removed') {
      this.cartItemsTotalPrice -= event.price;
    }
  }

}

