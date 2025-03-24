import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  PRODUCER_RATING_UNSPECIFIED
} from '../../layouts/pm-profile/producer.shared';

@Pipe({
  name: 'ratingOf'
})

export class PmRatingPipe implements PipeTransform {
  /** @ignore */
  protected readonly placeholder: string = '~';

  transform(rating: number, maxValue: number): string {
    const displayedRatingValue: string = (PRODUCER_RATING_UNSPECIFIED === rating) ?  this.placeholder : PmRatingPipe.formatNumber(rating);
    return `${displayedRatingValue}/${PmRatingPipe.formatNumber(maxValue)}`;
  }

  private static formatNumber(number: number): string {
    const formattedNumber: string = number.toFixed(1);
    return PmRatingPipe.replaceDecimalSeparator(formattedNumber);
  }

  private static replaceDecimalSeparator(value: string): string {
    return value.replace('.', ',');
  }
}
