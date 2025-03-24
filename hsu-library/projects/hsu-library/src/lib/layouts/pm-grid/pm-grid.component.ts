import {
  Component,
  Input,
} from '@angular/core';
import {
  fromEvent,
} from 'rxjs';
import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';
import {
  ButtonType
} from '../../components/pm-button/pm-button.component';
import {
  Icon
} from '../../components/pm-icon/pm-icon.shared';

const DESKTOP_VIEWPORT_SIZE: number = 1280;

@Component({
  selector: 'pm-grid',
  templateUrl: './pm-grid.component.html',
  styleUrls: ['./pm-grid.component.scss']
})
export class PmGridComponent {
  @Input()
  menuExpanded: boolean = true;

  @Input()
  isFullScreen: boolean = false;

  /** @ignore */
  lastWindowWidth: number = 0;

  /** @ignore */
  readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  readonly Icon: typeof Icon = Icon;

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((event: Event) => {
        const windowWidth: number = (<Window>event.target).outerWidth;
        this.handleMenuVisibilityOnViewportChange(windowWidth);
      });
  }

  /** @ignore */
  handleMenuVisibilityOnViewportChange(currentWindowWidth: number): void {
    if (currentWindowWidth < DESKTOP_VIEWPORT_SIZE && currentWindowWidth < this.lastWindowWidth) {
      this.menuExpanded = false;
    }

    if (currentWindowWidth >= DESKTOP_VIEWPORT_SIZE && currentWindowWidth > this.lastWindowWidth) {
      this.menuExpanded = true;
    }

    this.lastWindowWidth = currentWindowWidth;
  }

  /** @ignore */
  onClickOpenNavigation(): void {
    this.menuExpanded = true;
  }

  /** @ignore */
  onClickCloseNavigation(): void {
    this.menuExpanded = false;
  }

  /** @ignore */
  onClickToggleMenu(): void {
    this.menuExpanded = !this.menuExpanded;
  }
}
