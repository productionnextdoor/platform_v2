import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  of
} from 'rxjs';
import {
  DeveloperProfile,
  DeveloperProfileOutput,
  FullDeveloperProfileInput,
  FullDeveloperProfileOutput,
  UserExtendedServiceProxy,
  UserStatus
} from '../../../shared/service-proxies/service-proxies';
import {
  IDeveloper,
  EUserStatus
} from 'hsu-library';
import { IDeveloperService } from './ideveloper.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DeveloperService extends IDeveloperService {
  constructor(private readonly userServiceProxy: UserExtendedServiceProxy){
    super();
  }

  getCurrentDeveloper(): Observable<IDeveloper> {
    return this.userServiceProxy.getCurrentDevelopersProfile().pipe(
      map(this.mapToCurrentDeveloper.bind(this))
    );
  }

  getDeveloperById(developerId: number): Observable<IDeveloper> {
    return this.userServiceProxy.getDevelopersProfile(developerId).pipe(
      switchMap((developerProfile: FullDeveloperProfileOutput) => {
        const developer: IDeveloper = this.mapFromFullDeveloperOutput(developerProfile);
        return of(developer);
      })
    );
  }

  updateCurrentDeveloper(developer: IDeveloper): Observable<IDeveloper> {
    return of(developer).pipe(
      map((input: IDeveloper) => this.mapToDeveloperProfile(input)),
      switchMap(this.userServiceProxy.updateCurrentDevelopersProfile.bind(this.userServiceProxy)),
      map((input: DeveloperProfileOutput) => this.mapToCurrentDeveloper(input))
    );
  }

  updateDeveloper(developer: IDeveloper): Observable<IDeveloper> {
    return of(developer).pipe(
      map((input: IDeveloper) => this.mapToFullDeveloperInput(input)),
      switchMap(this.userServiceProxy.updateDeveloperProfile.bind(this.userServiceProxy)),
      map((input: FullDeveloperProfileOutput) => this.mapFromFullDeveloperOutput(input))
    );
  }

  private mapFromFullDeveloperOutput(developerProfile: FullDeveloperProfileOutput): IDeveloper {
    const statusEnumMap: Map<UserStatus, EUserStatus> = this.initStatusEnumMap();
    return {
      city: developerProfile.city,
      userId: developerProfile.userId,
      country: developerProfile.country,
      email: developerProfile.email,
      fullName: developerProfile.contactPersonFullName,
      isActive: developerProfile.isActive,
      note: developerProfile.note,
      phoneNumber: developerProfile.phoneNumber,
      pseudonym: developerProfile.companyName,
      region: developerProfile.region,
      street: developerProfile.street,
      zipCode: developerProfile.zipCode,
      numberOfDraftedProducts: developerProfile.productDesigns,
      numberOfProducts: developerProfile.productsInShop,
      status: statusEnumMap.get(developerProfile.status)
    };
  }

  private mapToCurrentDeveloper(developerProfile: DeveloperProfileOutput): IDeveloper {
    return {
      fullName: developerProfile.contactPersonFullName,
      pseudonym: developerProfile.companyName,
      street: developerProfile.street,
      zipCode: developerProfile.zipCode,
      city: developerProfile.city,
      region: developerProfile.region,
      country: developerProfile.country,
      email: developerProfile.email,
      phoneNumber: developerProfile.phoneNumber,
      isActive: developerProfile.isActive,
    };
  }

  private mapToDeveloperProfile(developer: IDeveloper): DeveloperProfile {
    const {
      fullName: contactPersonFullName = '',
      street = '',
      zipCode = '',
      city = '',
      region = '',
      country = '',
      email = '',
      phoneNumber = '',
    } = developer;
    return new DeveloperProfile({
      contactPersonFullName, street, zipCode, city, region, country, email, phoneNumber,
    });
  }

  private mapToFullDeveloperInput(developer: IDeveloper): FullDeveloperProfileInput {
    const {
      fullName: contactPersonFullName = '',
      pseudonym: companyName = '',
      userId: userId = 0,
      street = '',
      zipCode = '',
      city = '',
      region = '',
      country = '',
      email = '',
      phoneNumber = '',
      isActive = false,
      note = '',
    } = developer;

    return new FullDeveloperProfileInput(
      {
        contactPersonFullName,
        companyName,
        userId,
        street,
        zipCode,
        city,
        region,
        country,
        email,
        phoneNumber,
        isActive,
        note
      }
    );
  }

  private initStatusEnumMap(): Map<UserStatus, EUserStatus> {
    return new Map<UserStatus, EUserStatus>([
      [UserStatus.Active, EUserStatus.Active],
      [UserStatus.InActive, EUserStatus.InActive],
      [UserStatus.Invited, EUserStatus.Invited],
    ]);
  }
}
