import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { defaultBreadcrumbs, IBreadcrumbs } from '../pm-header/pm-header.shared';

@Component({
  selector: 'pm-content-with-sidebar',
  templateUrl: './pm-content-with-sidebar.component.html',
  styleUrls: ['./pm-content-with-sidebar.component.scss']
})
export class PmContentWithSidebarComponent {

  @Input()
  public breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  @Input()
  public sidebarCollapsed: boolean = false;

  @Input()
  public hasFullHeight: boolean = true;

  @Output()
  public onSidebarOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected openSidebar(): void {
    this.onSidebarOpen.emit(this.sidebarCollapsed = false);
  }
}
