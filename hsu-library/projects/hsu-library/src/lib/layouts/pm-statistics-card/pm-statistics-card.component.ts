import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { DefaultMargins } from '../../utils/pm-component-margin';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import {
  IPmStatisticsCardLocalisations,
  IPMStatisticsData,
  pmStatisticsCardLocalisations
} from './pm-statistics-card.shared';

@Component({
  selector: 'pm-statistics-card',
  templateUrl: './pm-statistics-card.component.html',
  styleUrls: ['./pm-statistics-card.component.scss']
})
export class PmStatisticsCardComponent {

  protected readonly margins = DefaultMargins;
  protected readonly ButtonType = ButtonType;
  protected readonly EPmInputType = EPmInputType;

  @Input()
  localisations: IPmStatisticsCardLocalisations = pmStatisticsCardLocalisations;

  @Output()
  onDownloadClicked: EventEmitter<IPMStatisticsData> = new EventEmitter();

  statisticsData: IPMStatisticsData = {
    filter: '',
    dateFrom: '',
    dateTo: ''
  }

  dateError: boolean = false;


  validateDate(): void {
    this.dateError = false;
    if (this.statisticsData.dateFrom !== '' && this.statisticsData.dateTo !== '') {
      const dateFrom: number = Date.parse(this.statisticsData.dateFrom);
      const dateTo: number = Date.parse(this.statisticsData.dateTo);
      this.dateError = dateFrom > dateTo
    }
  }
}
