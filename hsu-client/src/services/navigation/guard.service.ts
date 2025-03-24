import { IGuardService } from './iguard.service';
import {
  inject,
  Injectable
} from '@angular/core';
import { Path } from '../../app/app-routing.module';
import { INavigationService } from './inavigation.service';
import { IAuthService } from '../account/iauth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { IPermissionManagerService } from '../permissions/ipermission-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService extends IGuardService {

  constructor(
    private readonly navigationService: INavigationService,
    private readonly authService: IAuthService,
    private readonly permissionManagerService:IPermissionManagerService
  ) {
    super();
  }

  accessGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isTokenValid()) {
      this.navigationService.setRedirectUrl(state.url);
      this.navigationService.navigate(Path.LOGIN);
    }
    if (!this.permissionManagerService.isGrantedAny(route.data['permissions'])) {
      this.navigationService.navigate(Path.DEFAULT);
    }
    return true;
  }

  redirectGuard(route: ActivatedRouteSnapshot): boolean {
    const publicRoutes: string[] = [
      Path.LOGIN,
      Path.RESET_PASSWORD,
      Path.FORGOT_PASSWORD,
      Path.REGISTRATION
    ];

    if (route.routeConfig?.path && publicRoutes.includes(route.routeConfig.path) && this.authService.isTokenValid()) {
      this.navigationService.navigate(Path.PRODUCTS);
    }

    return true;
  }
}

export const AccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(GuardService).accessGuard(route,state);
}

export const RedirectGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return inject(GuardService).redirectGuard(route);
}
