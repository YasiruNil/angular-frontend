import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { Route, RouterModule } from '@angular/router';
import { ProductSetComponent } from './pages/product-set/product-set.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductPageComponent } from './pages/product-page/product-page.component';
// import { UiModule } from '@frontend/ui';
import { GalaryComponent } from './pages/galary/galary.component';
export const productsRoutes: Route[] = [
  { path: 'products', component: ProductsListComponent },
  { path: 'category/:categoryId', component: ProductsListComponent },
  { path: 'products/:productId', component: ProductPageComponent },
];
@NgModule({
  imports: [
    CommonModule,
    // UiModule,
    RouterModule.forChild(productsRoutes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
  ],
  declarations: [
    SearchComponent,
    ProductsListComponent,
    ProductSetComponent,
    ProductPageComponent,
    GalaryComponent,
  ],
  exports: [
    SearchComponent,
    ProductsListComponent,
    ProductSetComponent,
    ProductPageComponent,
    GalaryComponent,
  ],
})
export class ProductsModule {}
