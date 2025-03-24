import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';
import {
  EPmInputType
} from '../../components/pm-input/pm-input.component';
import {
  ButtonType
} from '../../components/pm-button/pm-button.component';
import {
  ILoginEvent,
  ILoginPageTexts,
  loginPageLocalisations
} from './pm-login.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { IImprintLink } from '../../shared/imprint.shared';
import { DefaultMargins } from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-login',
  templateUrl: './pm-login.component.html',
  styleUrls: ['./pm-login.component.scss']
})
export class PmLoginComponent<T> {

  @Input()
  logoPath: string = '';

  @Input()
  email: string = '';

  @Input()
  password: string = '';

  @Input()
  rememberMe: PmCheckboxState = PmCheckboxState.DEFAULT;

  @Input()
  loginPageTexts: ILoginPageTexts = loginPageLocalisations;

  @Input()
  imprintLinks: IImprintLink<T>[] = [];

  @Output()
  onLogin: EventEmitter<ILoginEvent> = new EventEmitter<ILoginEvent>();

  @Output()
  onForgotPassword: EventEmitter<void> = new EventEmitter();

  @Output()
  onClickImprintLink: EventEmitter<IImprintLink<T>> = new EventEmitter();

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;

  /**
   * @description: a method for submitting the form and emitting the form data
   * @ignore
   */
  onSubmit(): void {
    this.onLogin.emit({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe !== PmCheckboxState.DEFAULT
    });
  }

  /** @ignore */
  onImprintLinkClicked(link: IImprintLink<T>): void {
    this.onClickImprintLink.emit(link);
  }
}
