import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@frontend/products';
import { CartDetails } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-orders-cart-page',
  templateUrl: './orders-cart-page.component.html',
  styleUrls: ['./orders-cart-page.component.css'],
})
export class OrdersCartPageComponent implements OnInit {
  cartItemDetails: CartDetails[] = [];
  cartCount = 0;
  constructor(private router: Router, private cartService: CartService, private prodServices: ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();

  }
  backToShop() {
    this.router.navigate(['/products'])
  }
  deleteCart(cartItem: CartDetails) {
    console.log(cartItem, 'cartItem')
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  private _getCartDetails() {
    return this.cartService.cart$.pipe().subscribe((respCart) => {
      this.cartItemDetails = [];
      this.cartCount = respCart?.items?.length ?? 0;
      respCart.items?.forEach(item => {
        this.prodServices.getSingleProduct(item.productId || '').subscribe(prod => {
          prod && this.cartItemDetails && this.cartItemDetails.push({ product: prod, quantity: item.quantity })
        });
      })
    })
  }
  updateCartItemQuantity(event: { value: any; }, cartItem: CartDetails) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)

  }
}
