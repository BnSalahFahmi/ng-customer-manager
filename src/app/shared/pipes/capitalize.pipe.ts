import {Pipe, PipeTransform} from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  @memo()
  transform(value: any): unknown {
    return typeof value === 'string' && value.charAt(0).toUpperCase() + value.slice(1) || value;
  }

}
