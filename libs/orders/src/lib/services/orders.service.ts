import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { map, Observable, switchMap } from 'rxjs';
import { OrderItem } from '../models/orderItem';
import { StripeService } from 'ngx-stripe';
@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private http: HttpClient, private stripeService: StripeService,) {

    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('http://localhost:4000/api/v1/orders');
    }
    getSingleOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`http://localhost:4000/api/v1/order/${orderId}`);
    }
    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>('http://localhost:4000/api/v1/order', order);
    }

    deleteOrder(orderId: string): Observable<any> {
        return this.http.delete<any>(`http://localhost:4000/api/v1/order/${orderId}`);
    }
    updateOrder(orderStatus: { status: string }, orderProd: string): Observable<Order> {
        return this.http.put<Order>(`http://localhost:4000/api/v1/order/${orderProd}`, orderStatus);
    }
    getOrderCount(): any {
        return this.http.get<any>('http://localhost:4000/api/v1/order/count');
    }
    totalSales(): any {
        return this.http.get<any>('http://localhost:4000/api/v1/orders/totalsales').pipe(map((objectValue: any) => objectValue.total_sales));

    }
    createCheckoutSession(orderItem: OrderItem[]) {
        // return this.http.post('http://localhost:4000/api/v1/create-checkout-session', orderItem).pipe(switchMap((session) => {
        //     console.log(session)
        //     // return this.stripeService.redirectToCheckout({ sessionId: id})

        // }));
    }

}
