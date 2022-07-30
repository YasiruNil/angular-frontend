import { NgModule } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrdersCartPageComponent } from './components/orders-cart-page/orders-cart-page.component';
import { ButtonModule } from 'primeng/button';
import { Route, RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AuthGuardService } from '@frontend/users';
export const productsRoutes: Route[] = [
  { path: 'cart', component: OrdersCartPageComponent },
  { path: 'checkout', canActivate: [AuthGuardService], component: CheckoutPageComponent },

  {
    path: 'success',
    component: ThankyouComponent,
  },
];
@NgModule({
  imports: [
    FormsModule,
    BadgeModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    ReactiveFormsModule,
    RouterModule.forChild(productsRoutes),
  ],
  declarations: [
    CartIconComponent,
    OrdersCartPageComponent,
    OrderSummeryComponent,
    CheckoutPageComponent,
    ThankyouComponent,
  ],
  exports: [CartIconComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initialCartLocalStorage();
  }
}
