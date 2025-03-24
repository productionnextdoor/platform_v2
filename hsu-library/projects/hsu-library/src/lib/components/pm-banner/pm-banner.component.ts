import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import {
  Icon, IconSize
} from '../pm-icon/pm-icon.shared';
import {
  BannerType
} from './pm-banner.shared';
import { IComponentMargin, PmComponentMargin } from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-banner',
  templateUrl: './pm-banner.component.html',
  styleUrls: ['./pm-banner.component.scss']
})
export class PmBannerComponent {
  @Output()
  onCloseBanner: EventEmitter<string> = new EventEmitter();

  @Input()
  bannerText: string = '';

  @Input()
  bannerType: BannerType = BannerType.INFO;

  @Input()
  margin: IComponentMargin = new PmComponentMargin();

  /** @ignore */
  readonly EBannerType: typeof BannerType = BannerType;

  /** @ignore */
  readonly EIcon: typeof Icon = Icon;

  /** @ignore */
  readonly EIconSize: typeof IconSize = IconSize;

  /** @ignore */
  onCloseBannerHandler(): void {
    this.onCloseBanner.emit(this.bannerText);
  }
}
