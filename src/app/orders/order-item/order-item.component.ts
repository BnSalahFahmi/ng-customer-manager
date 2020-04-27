import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ng-cm-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() customer: Customer;

  constructor() {
  }

  ngOnInit(): void {
  }

  totalOrder() {
    return this.customer.orders.map(item => item.itemCost).reduce((a, b) => a + b);
  }

}
