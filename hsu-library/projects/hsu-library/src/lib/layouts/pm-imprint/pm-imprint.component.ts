import {
  Component,
  Input
} from '@angular/core';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { IBreadcrumbs } from '../pm-header/pm-header.shared';

@Component({
  selector: 'pm-imprint',
  templateUrl: './pm-imprint.component.html',
  styleUrls: ['./pm-imprint.component.scss']
})
export class PmImprintComponent {
  @Input()
  title: string = '';

  @Input()
  content: string = '';

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  getBreadcrumbs():IBreadcrumbs {
    return {
      lastBreadcrumb: this.title
    }
  }
}
