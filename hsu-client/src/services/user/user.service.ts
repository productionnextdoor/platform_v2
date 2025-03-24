import { Injectable } from '@angular/core';
import { IUserService } from './iuser.services';
import { DeveloperListDto, UserExtendedServiceProxy } from '../../shared/service-proxies/service-proxies';
import { map, Observable } from 'rxjs';
import { PmDropdownOption } from 'hsu-library';

export interface IUserRoles {
  developer: string;
  producer: string;
}

export const UserRoles: IUserRoles = {
  developer: 'Developer',
  producer: 'Producer'
} as const;

export type TUserRole = keyof typeof UserRoles;

@Injectable()
export class UserService extends IUserService {
  constructor(private readonly userServiceProxy: UserExtendedServiceProxy) {
    super();
  }

  getDevelopersAsDropdownOptions(): Observable<PmDropdownOption<number>[]> {
    return this.userServiceProxy.getAllDevelopers().pipe(
      map(this.listDtoToDropdownOptions.bind(this))
    );
  }

  deleteUserProfile(userId: number): Observable<void> {
    return this.userServiceProxy.deleteInvitedUser(userId);
  }

  private listDtoToDropdownOptions(developers: DeveloperListDto[]): PmDropdownOption<number>[] {
    return developers.map(developer => ({
      key: developer.developerId,
      value: `${developer.name ?? ''} ${developer.surname ?? ''}`
    }));
  }
}
