import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService, ProductsService } from '@frontend/products';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products-form/products-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { AuthGuardService, JwtInterceptor, UsersModule, UsersService } from '@frontend/users';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';
const routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardService],
    children: [

      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'category',
        component: CategoriesComponent,
      },
      {
        path: 'category/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'category/form/:id',
        component: CategoriesFormComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/form',
        component: UserFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
      {
        path: 'orders/:id',
        component: OrdersDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    UserListComponent,
    UserFormComponent,
    DashboardComponent,
    CategoriesComponent,
    OrdersListComponent,
    ProductsListComponent,
    ProductsFormComponent,
    OrdersDetailsComponent,
    CategoriesFormComponent,
  ],
  imports: [
    TagModule,
    CardModule,
    UsersModule,
    TableModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    ButtonModule,
    EditorModule,
    BrowserModule,
    ToolbarModule,
    FieldsetModule,
    PasswordModule,
    DropdownModule,
    InputTextModule,
    HttpClientModule,
    InputNumberModule,
    InputNumberModule,
    ColorPickerModule,
    InputSwitchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    UsersService,
    MessageService,
    ProductsService,
    CategoriesService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
