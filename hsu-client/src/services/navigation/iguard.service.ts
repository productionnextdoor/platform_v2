import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export abstract class IGuardService {
  abstract accessGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
  abstract redirectGuard(route: ActivatedRouteSnapshot): boolean;
}
