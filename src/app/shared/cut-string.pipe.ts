import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {

  transform(value: string, quantity = 10): string {

    if (typeof value !== `string`) {
      return '';
    } else {
      const cuttedValue = value.substr(0, quantity);

      return value.length <= quantity
        ? cuttedValue
        : cuttedValue + '...';
    }
  }
}
