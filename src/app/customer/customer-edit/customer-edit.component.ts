import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {NotifService} from '../../core/services/notif.service';
import {Observable} from 'rxjs';
import {CustomersService} from '../../core/services/customers.service';
import * as _ from 'lodash';

@Component({
  selector: 'ng-cm-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: 'male',
    address: '',
    city: '',
    state: {
      abbreviation: '',
      name: ''
    }
  };

  states$: Observable<State[]>;
  deleteMessageEnabled: boolean;
  @ViewChild('form', {static: true}) customerForm: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private customersService: CustomersService,
              private notifService: NotifService) {
    this.states$ = this.dataService.getStates();
  }

  ngOnInit(): void {
    const id = +this.route.parent.snapshot.paramMap.get('id');
    if (!isNaN(id)) {
      this.customersService.getByKey(id).subscribe(
        data => {
          this.customer = _.clone(data);
        }
      );
    }
    this.states$ = this.dataService.getStates();
  }

  submit() {
    if (this.customer.id === 0) {
      this.customersService.add(this.customer).subscribe(
        (insertedCustomer: Customer) => {
          if (insertedCustomer) {
            this.customerForm.form.markAsPristine();
            this.notifService.openSuccessNotif('Customer created successfully');
            this.customerForm.resetForm();
          } else {
            this.notifService.openErrorNotif('Unable to insert customer');
          }
        },
        (err: any) => console.log('Error occurred ' + err)
      );
    } else {
      this.customersService.update(this.customer)
        .subscribe((status) => {
            if (status) {
              this.customerForm.form.markAsPristine();
              this.notifService.openSuccessNotif('Customer updated successfully');
            } else {
              this.notifService.openErrorNotif('Unable to update customer');
            }
          },
          (err: any) => console.log('Error occurred ' + err));
    }
  }

  cancelRequest() {
    this.router.navigate(['/customers']);
  }

}
