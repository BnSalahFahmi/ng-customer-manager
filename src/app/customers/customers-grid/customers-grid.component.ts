import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/route.animations';

@Component({
  selector: 'ng-cm-customers-grid',
  templateUrl: './customers-grid.component.html',
  styleUrls: ['./customers-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersGridComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() customers = [];
  page = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
