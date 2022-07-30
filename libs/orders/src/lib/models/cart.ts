export class Cart {
    items?: CartItems[];
}

export class CartItems {
    productId?: string;
    quantity?: number
}

export class CartDetails{
    product?: any;
    quantity?: number
}