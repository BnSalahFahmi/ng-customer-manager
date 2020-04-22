import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class DataService {

  port = '8090';
  baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;
  customersBaseUrl = this.baseUrl + '/api/customers';

  constructor(private http: HttpClient, @Inject('Window') private window: Window) {

  }

  getDataInfos(): Observable<DataInfo> {
    return this.http.get<DataInfo>(this.baseUrl + '/api/dataInfos')
      .pipe(
        map(infos => infos),
        catchError(() => Observable.throw('Error occurred during retrieving data'))
      );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersBaseUrl)
      .pipe(
        map(customers => {
          this.calculateCustomersOrderTotal(customers);
          return customers;
        }),
        catchError(() => Observable.throw('Error occurred during retrieving data'))
      );
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(this.customersBaseUrl + '/' + id)
      .pipe(
        map(customer => {
          this.calculateCustomersOrderTotal([customer]);
          return customer;
        }),
        catchError(() => Observable.throw('Error occurred during retrieving data'))
      );
  }

  calculateCustomersOrderTotal(customers: Customer[]) {
    for (const customer of customers) {
      if (customer && customer.orders) {
        let total = 0;
        for (const order of customer.orders) {
          total += order.itemCost;
        }
        customer.orderTotal = total;
      }
    }
  }
}
