import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/route.animations';

@Component({
  selector: 'ng-cm-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersCardComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() customers = [];
  @Output() deleteCustomerEvent = new EventEmitter();
  page = 1;

  constructor() {
  }

  ngOnInit(): void {

  }

  handleDeleteCustomerClick(customerId: number) {
    this.deleteCustomerEvent.emit(customerId);
  }

}
