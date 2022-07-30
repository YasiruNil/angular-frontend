import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { ORDER_STATUS } from '../order.constant';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;
  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this._getOrders();
  }
  private _getOrders() {
    this.ordersService.getOrders().subscribe(response => {
      this.orders = response;
    })
  }
  viewOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }
  deleteOrder(orderId: string) {
    console.log(orderId)
  }
}
