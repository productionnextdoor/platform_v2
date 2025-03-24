import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  IComponentMargin,
  Margin
} from '../pm-component-margin';

@Pipe({
  name: 'marginConverter'
})
export class PmMarginConverterPipe implements PipeTransform {

  protected formatMarginValue(value: Margin): string {
    if (value === 'auto') {
      return 'auto';
    }

    return `${value}px`;
  }

  public marginToString(value: IComponentMargin): string {
    let result: string = '';

    if (value.left !== value.right) {
      result = this.formatMarginValue(value.left);
    }

    if (result !== '' || value.top !== value.bottom) {
      result = `${this.formatMarginValue(value.bottom)} ${result}`;
    }

    if (result !== '' || value.top !== value.right) {
      result = `${this.formatMarginValue(value.right)} ${result}`;
    }

    return `${this.formatMarginValue(value.top)} ${result}`.trim();
  }

  transform(value: IComponentMargin): string {
    return this.marginToString(value);
  }
}
