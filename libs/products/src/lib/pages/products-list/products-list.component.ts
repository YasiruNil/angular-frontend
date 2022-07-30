import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@frontend/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'frontend-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  isCategory = false;
  endSubscription$: Subject<any> = new Subject();

  constructor(private productService: ProductsService, private categoriesServive: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryId'] ? this._getProducts([params['categoryId']]) : this._getProducts();
      params['categoryId'] ? this.isCategory = true : this.isCategory = false
    })
    this._getCategories();
    this._getFeaturedProducts();

  }
  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  private _getCategories() {
    this.categoriesServive.getCategories().pipe(takeUntil(this.endSubscription$)).subscribe(response => {
      this.categories = response;
    })
  }
  private _getFeaturedProducts() {
    this.productService.getFeaturedProducts(10).subscribe(prod => {
      this.products = prod;
    })
  }
  private _getProducts(categoryId?: any) {
    this.productService.getProducts(categoryId).subscribe((res) => {
      this.products = res;
    })

  }
  categoryFilter() {
    const selectedCategories = this.categories?.filter((cat) => cat.checked
    ).map(item => item.id);
    this._getProducts(selectedCategories)
  }
}
