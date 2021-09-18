import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countToColor',
  pure: true
})
export class CountToColorPipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): unknown {
    if (value === undefined || value === 0) {
      return 'unset';
    } else if (value === 1) {
      return '#CCF1FF';
    } else if (value === 2) {
      return '#E0D7FF';
    } else if (value === 3) {
      return '#FFCCE1';
    } else if (value === 4) {
      return '#D7EEFF';
    } else if (value === 5) {
      return '#FAFFC7';
    } else  {
      return '#F3DDF2';
    }
  }

}
