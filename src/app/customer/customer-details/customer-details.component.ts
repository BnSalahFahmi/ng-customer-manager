import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CustomersService} from '../../core/services/customers.service';

@Component({
  selector: 'ng-cm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customer$: Observable<Customer>;
  loading$: Observable<boolean>;
  mapEnabled = true;

  @ViewChild('mapsContainer', {read: ViewContainerRef})
  private mapsViewContainerRef: ViewContainerRef;

  constructor(
    private customersService: CustomersService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute) {
    this.loading$ = this.customersService.loading$;
  }

  ngOnInit(): void {
    const id = +this.route.parent.snapshot.paramMap.get('id');
    this.customer$ = this.customersService.getByKey(id);
  }

}
