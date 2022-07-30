import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { UiModule } from '@frontend/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { CategoriesService, ProductsModule } from '@frontend/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartService, OrdersModule } from '@frontend/orders';
import { JwtInterceptor, UsersModule } from '@frontend/users';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';
const routes: Routes = [
  { path: '', component: HomePageComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    UiModule,
    BrowserAnimationsModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    NgxStripeModule.forRoot(),
  ],
  providers: [CategoriesService, ProductsModule, CartService, MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
