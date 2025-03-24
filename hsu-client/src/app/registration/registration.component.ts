import {
  Component, Input as QueryParam, OnInit
} from '@angular/core';
import { Path } from '../app-routing.module';
import { INavigationService } from '../../services/navigation/inavigation.service';
import { UserRoles, TUserRole } from '../../services/user/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  @QueryParam()
  protected userRole!: TUserRole;

  @QueryParam()
  protected verificationCode: string = '';

  protected isDeveloper: boolean = false;
  protected isProducer: boolean = false;

  constructor(
    private readonly navigationService: INavigationService
  ) {
  }

  ngOnInit() {
    switch (this.userRole) {
    case UserRoles.developer:
      this.isDeveloper = true;
      break;
    case UserRoles.producer:
      this.isProducer = true;
      break;
    default:
      this.navigationService.navigate(Path.LOGIN);
    }
  }
}
