import {Pipe, PipeTransform} from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'totalOrder'
})
export class TotalOrderPipe implements PipeTransform {

  @memo()
  transform(customer: Customer): number {
    if (customer.orders) {
      return customer.orders.map(item => item.itemCost).reduce((a, b) => a + b);
    } else {
      return 0;
    }
  }

}
