import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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
  mapComponentRef: ComponentRef<any>;
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

  /*async lazyLoadMapComponent() {
    if (!this.mapsViewContainerRef.length) {
      const {MapComponent} = await import('../../shared/map/map.component');
      const component = this.componentFactoryResolver.resolveComponentFactory(MapComponent);
      this.mapComponentRef = this.mapsViewContainerRef.createComponent(component);
      this.mapComponentRef.instance.zoom = 10;
      this.mapComponentRef.instance.customer = this.customer;
      this.mapComponentRef.instance.enabled = true;
    }
  }*/

}
