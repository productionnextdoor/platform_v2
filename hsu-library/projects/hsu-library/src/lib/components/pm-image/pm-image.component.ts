import { Component, Input } from '@angular/core';
import { Icon } from '../pm-icon/pm-icon.shared';
import { ButtonType } from '../pm-button/pm-button.component';
import { PopupType } from '../pm-popup/pm-popup.component';


@Component({
  selector: 'pm-image',
  templateUrl: './pm-image.component.html',
  styleUrls: ['./pm-image.component.scss']
})
export class PmImageComponent {

  @Input()
  public hasLimitHeight: boolean = false;

  @Input()
  public imagePath: string = '';

  @Input()
  public imagePathFull: string = '';

  @Input()
  public alternateImageText?: string = '';

  @Input()
  public popupOpen: boolean = false;

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;

  /** @ignore */
  protected onOpenImage(): void {
    this.popupOpen = true;
  }

  /** @ignore */
  protected onCloseImage(): void {
    this.popupOpen = false;
  }

}
