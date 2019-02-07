import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})

export class TimePipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    } else {
      const hours   = Math.floor(value / 3600);
      const minutes = Math.floor((value - (hours * 3600)) / 60);
      const seconds = value - (hours * 3600) - (minutes * 60);

      const addLeadingZero = (val: number) => {
        return (val < 10) ? '0' + val : val;
      };

      return addLeadingZero(hours) +
        ':' + addLeadingZero(minutes) +
        ':' + addLeadingZero(seconds);
    }
  }
}
