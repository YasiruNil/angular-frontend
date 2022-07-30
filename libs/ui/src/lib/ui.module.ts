import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriesItemsComponent } from './categories-items/categories-items.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProductItemsComponent } from './product-items/product-items.component';

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    CategoriesItemsComponent,
    FeaturedProductsComponent,
    ProductItemsComponent,
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    ProductItemsComponent,
    CategoriesItemsComponent,
    FeaturedProductsComponent,
  ],
})
export class UiModule { }
