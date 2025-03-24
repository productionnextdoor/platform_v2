import { Injectable } from '@angular/core';
import { PermissionCheckerService } from 'abp-ng2-module';
import { IPermissionManagerService } from './ipermission-manager.service';

@Injectable()
export class PermissionsManagerService extends IPermissionManagerService {

  constructor(
    private readonly permissionCheckerService: PermissionCheckerService
  ) {
    super();
  }

  public isGranted(permission: string): boolean {
    return this.permissionCheckerService.isGranted(permission);
  }

  public isGrantedAny(permissions: string[]): boolean {
    return permissions.some(permission => this.isGranted(permission));
  }
}
