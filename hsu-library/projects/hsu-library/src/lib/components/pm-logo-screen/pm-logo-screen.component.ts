import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'pm-logo-screen',
  templateUrl: './pm-logo-screen.component.html',
  styleUrls: ['./pm-logo-screen.component.scss']
})
export class PmLogoScreenComponent {
  @Input()
  logoPath: string = '';

  @Input()
  hasLimitWidth: boolean = true;
}
