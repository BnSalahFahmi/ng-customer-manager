import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class DataService {

  port = '8090';
  baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;
  customersBaseUrl = this.baseUrl + '/api/customers';
  statesBaseUrl = this.baseUrl + '/api/states';

  constructor(private http: HttpClient, @Inject('Window') private window: Window) {

  }

  getDataInfos(): Observable<DataInfo> {
    return this.http.get<DataInfo>(this.baseUrl + '/api/dataInfos')
      .pipe(
        map(infos => infos),
        catchError(this.handleError)
      );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersBaseUrl)
      .pipe(
        map(customers => {
          this.calculateCustomersOrderTotal(customers);
          return customers;
        }),
        catchError(this.handleError)
      );
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(this.customersBaseUrl + '/' + id)
      .pipe(
        map(customer => {
          this.calculateCustomersOrderTotal([customer]);
          return customer;
        }),
        catchError(this.handleError)
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

  insertCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersBaseUrl, customer)
      .pipe(catchError(this.handleError));
  }

  updateCustomer(customer: Customer): Observable<boolean> {
    return this.http.put<ApiResponse>(this.customersBaseUrl + '/' + customer.id, customer)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse>(this.customersBaseUrl + '/' + id)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(this.statesBaseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'NodeJS Server Error');
  }
}
