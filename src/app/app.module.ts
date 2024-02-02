import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListingComponent } from './components/item-listing/item-listing.component';
import { ItemComponent } from './components/item/item.component';
import { FormsModule } from '@angular/forms';
import { ImageTileComponent } from './components/image-tile/image-tile.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';
import { ResetUserComponent } from './components/reset-user/reset-user.component';
import { TopNotificationComponent } from './components/top-notification/top-notification.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListingComponent,
    ItemComponent,
    ImageTileComponent,
    CartPageComponent,
    RegisterUserComponent,
    CartItemComponent,
    PaymentComponent,
    OrderSummaryComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    OrderListingComponent,
    ResetUserComponent,
    TopNotificationComponent,
    OrderComponent
  ],
  imports: [
    CookieModule.withOptions(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
