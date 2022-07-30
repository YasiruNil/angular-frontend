import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@frontend/products';

@Component({
  selector: 'featured-products',
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts() {
    this.productService.getFeaturedProducts(4).subscribe(prod => {
      this.products = prod;
    })
  }

}
