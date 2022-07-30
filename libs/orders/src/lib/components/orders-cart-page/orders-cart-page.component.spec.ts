import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCartPageComponent } from './orders-cart-page.component';

describe('OrdersCartPageComponent', () => {
  let component: OrdersCartPageComponent;
  let fixture: ComponentFixture<OrdersCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersCartPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
