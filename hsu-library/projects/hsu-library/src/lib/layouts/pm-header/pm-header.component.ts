import {
  Component, Input, TemplateRef
} from '@angular/core';
import { Icon, IconSize } from '../../components/pm-icon/pm-icon.shared';
import { PmButtonComponent } from '../../components/pm-button/pm-button.component';
import { IBreadcrumbs, defaultBreadcrumbs } from './pm-header.shared';

@Component({
  selector: 'pm-header',
  templateUrl: './pm-header.component.html',
  styleUrls: [
    './pm-header.component.scss'
  ]
})

export class PmHeaderComponent {
  @Input()
  breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  @Input()
  headerButtonsTemplate!: TemplateRef<PmButtonComponent>;

  /** @ignore */
  readonly IconSize: typeof IconSize = IconSize;

  /** @ignore */
  readonly Icon: typeof Icon = Icon;
}
