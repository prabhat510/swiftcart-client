import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListingComponent } from './components/item-listing/item-listing.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';
import { ResetUserComponent } from './components/reset-user/reset-user.component';

const routes: Routes = [
  {path: '', component: ItemListingComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetUserComponent},
  {path: 'cart', component: CartPageComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrderListingComponent, canActivate: [AuthGuard]},
  {path: 'account', component: UserProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
