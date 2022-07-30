import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@frontend/products';

@Component({
  selector: 'product-items',
  templateUrl: './product-items.component.html',
})
export class ProductItemsComponent implements OnInit {
  @Input() product: Product | undefined;
  constructor() { }

  ngOnInit(): void {
   }
}
