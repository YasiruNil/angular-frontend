import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItems, CartService } from '@frontend/orders';
import { Product } from '@frontend/products';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'frontend-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  quantity = 1;

  constructor(private prodService: ProductsService, private route: ActivatedRoute, private cart: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productId']) {
        this._getProducts(params['productId'])
        this._getQuantityCount(params['productId'])
      }

    })

  }
  private _getProducts(prodId: string) {
    this.prodService.getSingleProduct(prodId).subscribe((res) => {
      this.product = res
    })

  }
  private _getQuantityCount(id: string) {
    const cartItems = this.cart.getCart();
    const cartItemFIlter = cartItems.items?.filter(val =>
      val.productId === id
    )
    this.quantity = cartItemFIlter && cartItemFIlter.length > 0 && cartItemFIlter[0].quantity || 1;
  }
  addProductCart() {
    const cartItem: CartItems = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cart.setCartItem(cartItem, true);
  }
}
