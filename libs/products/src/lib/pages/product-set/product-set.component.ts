import { Component, Input, OnInit } from '@angular/core';
import { CartItems, CartService } from '@frontend/orders';
import { Product } from '../../models/products';

@Component({
  selector: 'product-set',
  templateUrl: './product-set.component.html',
})
export class ProductSetComponent implements OnInit {
  @Input() product: Product | undefined;
  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  addProductToCart() {
    const cartItem: CartItems = {
      productId: this.product && this.product.id || '', quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }
}
