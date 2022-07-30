import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { UsersService } from '@frontend/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statics: any = [];
  constructor(private userService: UsersService, private productService: ProductsService,
    private orderstatus: OrdersService) { }

  ngOnInit(): void {
    const ordersCount = this.orderstatus.getOrderCount();
    const productsCount = this.productService.getProductConut();
    const usersCount = this.userService.getUserCount();
    const totalSales = this.orderstatus.totalSales();
    combineLatest(ordersCount, productsCount, usersCount, totalSales).subscribe(
      ([ordersCount, productsCount, usersCount, totalSales]: any) => {
        const newCounts = {
          ordersCount: ordersCount.orderCount,
          productsCount: productsCount.productCount,
          usersCount: usersCount.userCount,
          totalSales: totalSales.total_sales

        }
        this.statics = newCounts
      }
    );
  }
}
