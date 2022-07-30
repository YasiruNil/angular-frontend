import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constant';
@Component({
  selector: 'admin-orders-details',
  templateUrl: './orders-details.component.html',
})
export class OrdersDetailsComponent implements OnInit {
  order: Order = {};
  orderStatuses: any = [];
  selectedStatus: any;
  constructor(private ordersService: OrdersService,
    private messageService: MessageService,
    private router: ActivatedRoute) { }
  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.entries(ORDER_STATUS).map(([key, value]) => {
      return {
        id: key,
        name: value.label
      }
    }
    )
  }
  onStatusChange(event: any) {
    this.router.params.subscribe(params => {
      if (params['id']) {
        console.log(event,)
        this.ordersService.updateOrder({ status: event.value }, params['id']).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'status changes' });
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'status not changed' });
        })
      }
    })
  }
  private _getOrder() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.ordersService.getSingleOrder(params['id']).subscribe(response => {
          this.order = response;
        })
      }
    })

  }
}
