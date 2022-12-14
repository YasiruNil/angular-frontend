import { Cart, CartItems } from '../models/cart';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() {

  }

  initialCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: []
      }
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem('cart', initialCartJson)
    }

  }
  getCart(): Cart {
    const cartJsonString = localStorage.getItem(CART_KEY);
    const cart: Cart = cartJsonString && JSON.parse(cartJsonString);
    return cart
  }
  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
  setCartItem(cartItem: CartItems, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart?.items?.find(item =>

      item.productId === cartItem.productId
    )
    if (cartItemExist) {
      cart.items?.map(item => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity
          } else {
            if (item?.quantity && cartItem?.quantity)
              item.quantity = item?.quantity + cartItem?.quantity
          }

        }
      })
    } else {
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson)
    this.cart$.next(cart);
    return cart;
  }
  deleteCartItem(productId: string) {
    console.log(productId);
    const cart = this.getCart();
    console.log(cart)
    const newCart = cart?.items?.filter(item => {
      return item.productId !== productId
    })
    cart.items = newCart;
    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString)
    this.cart$.next(cart);
  }
}