import {
  Component,
  Input
} from '@angular/core';
import {
  developerRevenueCardLocalisations,
  developerRevenueInfo,
  IDeveloperRevenueCardLocalisations,
  IDeveloperRevenueInfo
} from './pm-developer-revenue-card.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import { TextType } from '../../components/pm-text/pm-text.shared';

@Component({
  selector: 'pm-developer-revenue-card',
  templateUrl: './pm-developer-revenue-card.component.html',
  styleUrls: ['./pm-developer-revenue-card.component.scss']
})
export class PmDeveloperRevenueCardComponent {

  @Input()
  localisations: IDeveloperRevenueCardLocalisations = developerRevenueCardLocalisations;

  @Input()
  revenueData: IDeveloperRevenueInfo = developerRevenueInfo;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly textMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XSmall, DefaultMargins.Medium);
}
