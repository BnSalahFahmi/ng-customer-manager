import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {NotifService} from '../../core/services/notif.service';
import {Observable} from 'rxjs';
import {CustomersService} from '../../core/services/customers.service';
import * as _ from 'lodash';
import {ModalService} from '../../core/modal/modal.service';

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
  @ViewChild('form', {static: true}) customerForm: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private modalService: ModalService,
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
            this.dataService.refreshData.next(true);
            this.customerForm.resetForm();
            this.notifService.openSuccessNotif('Customer created successfully');
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
              this.dataService.refreshData.next(true);
              this.notifService.openSuccessNotif('Customer updated successfully');
            } else {
              this.notifService.openErrorNotif('Unable to update customer');
            }
          },
          (err: any) => console.log('Error occurred ' + err));
    }
  }

  onDeleteCustomer(event) {
    event.preventDefault();
    const modalContent: ModalContent = {
      header: 'Delete Customer ?',
      body: 'Would you really like to delete this customer ?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Delete'
    };

    this.modalService.show(modalContent).then(
      (response) => {
        if (response) {
          this.deleteCustomer(this.customer.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCustomer(event) {
    this.customersService.delete(this.customer.id).subscribe(
      data => {
        this.notifService.openSuccessNotif('Customer Deleted Successfully');
        this.dataService.refreshData.next(true);
        this.router.navigate(['/customers']);
      }
    );
  };

  cancelRequest() {
    this.router.navigate(['/customers']);
  }

}
