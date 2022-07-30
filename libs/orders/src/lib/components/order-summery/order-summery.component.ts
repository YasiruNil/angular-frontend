import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@frontend/products';
import { take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summery',
  templateUrl: './order-summery.component.html',
})
export class OrderSummeryComponent implements OnInit {
  totalPrice!: number;
  isCheckout = false;
  constructor(private cartService: CartService, private productService: ProductsService, private router: Router) {
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this._getOrderSummery();
  }
  private _getOrderSummery() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0
      if (cart) {
        console.log(cart);
        cart.items?.map(item => {

          return item.productId && this.productService.getSingleProduct(item.productId).pipe(take(1))
            .subscribe((product) => {
              return this.totalPrice += (product.price || 0) * (item.quantity || 0)
            })
        })
      }
    })
  }
  checkoutPage() {
    this.router.navigate(['/checkout'])
  }
}
