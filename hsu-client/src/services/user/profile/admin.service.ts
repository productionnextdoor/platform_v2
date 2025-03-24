import { Injectable } from '@angular/core';
import { IAdminService } from './iadmin.service';
import { AdminProfileDto, UserExtendedServiceProxy } from '../../../shared/service-proxies/service-proxies';
import {
  map, Observable, of
} from 'rxjs';
import { IAdmin } from 'hsu-library';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AdminService extends IAdminService {
  constructor(private readonly userServiceProxy: UserExtendedServiceProxy){
    super();
  }

  getCurrentAdmin(): Observable<IAdmin> {
    return this.userServiceProxy.getCurrentAdminProfile().pipe(
      map(this.mapToCurrentAdmin.bind(this))
    )
  }

  updateCurrentAdmin(admin: IAdmin): Observable<IAdmin> {
    return of(admin).pipe(
      map((input: IAdmin) => this.mapFromCurrentAdmin(input)),
      switchMap((input: AdminProfileDto) => this.userServiceProxy.updateCurrentAdminProfile(input)),
      map((input: IAdmin) => this.mapToCurrentAdmin(input))
    );
  }

  private mapFromCurrentAdmin(admin: IAdmin): AdminProfileDto {
    const {
      fullName = '',
      emailAddress = '',
    } = admin;
    return new AdminProfileDto({
      fullName, emailAddress
    });
  }

  private mapToCurrentAdmin(admin: IAdmin): IAdmin {
    return {
      fullName: admin.fullName,
      emailAddress: admin.emailAddress,
    };
  }
}
