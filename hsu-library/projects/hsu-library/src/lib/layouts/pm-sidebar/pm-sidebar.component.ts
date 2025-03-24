import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';

@Component({
  selector: 'pm-sidebar',
  templateUrl: './pm-sidebar.component.html',
  styleUrls: ['./pm-sidebar.component.scss']
})
export class PmSidebarComponent {
  @Input()
  logoPath: string = '';

  @Input()
  isImpersonated: boolean = false;

  @Input()
  isAuthenticated: boolean = true;

  @Output()
  onLogout: EventEmitter<void> = new EventEmitter();

  @Output()
  onOpenProfile: EventEmitter<void> = new EventEmitter();

  @Output()
  onLogoutImpersonation: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly EIcon: typeof Icon = Icon;

}
