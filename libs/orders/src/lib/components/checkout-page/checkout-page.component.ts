import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService, Order, OrdersService } from '@frontend/orders';
import { UsersService } from '@frontend/users';
import * as countriesLib from 'i18n-iso-countries';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { StripeService } from 'ngx-stripe';
declare const require: (arg0: string) => countriesLib.LocaleData;
@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})


export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private messageService: MessageService,
    private stripeService: StripeService,
  ) { }
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: any;
  userId = '609d65943373711346c5e950';
  countries: any;

  ngOnInit(): void {

    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
    this._autoFillUserData();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    if (cart.items) {
      this.orderItems = cart.items.map((item) => {
        return {
          product: item.productId,
          quantity: item.quantity
        };
      });
    }

  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map(entry => {
      return { id: entry[0], name: entry[1] }
    })
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup?.invalid) {
      return;
    }

    // this.ordersService.createCheckoutSession(this.orderItems).subscribe(error => {
    //   if (error) {
    //     console.log('error in redirect to payment')
    //   }
    // })
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  private _autoFillUserData() {
    this.usersService.observeCurrentUser().pipe(take(1)).subscribe((user: any) => {
      console.log('userssdss', user)
      if (user) {
        this.checkoutForm['name'].setValue(user.name);
        this.checkoutForm['email'].setValue(user.email);
        this.checkoutForm['phone'].setValue(user.phone);
        this.checkoutForm['city'].setValue(user.city);
        this.checkoutForm['country'].setValue(user.country);
        this.checkoutForm['apartment'].setValue(user.apartment);
        this.checkoutForm['zip'].setValue(user.zip);
        this.checkoutForm['street'].setValue(user.street);
      }
    })
  }
  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
