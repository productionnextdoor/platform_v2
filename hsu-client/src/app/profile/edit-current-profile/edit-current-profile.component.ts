import {
  Component, EventEmitter,
  OnInit, Output
} from '@angular/core';
import {
  IAdmin,
  IAdminProfileFormLabelLocalisation,
  IAdminProfileLocalisation,
  IDeveloper,
  IDeveloperProfileFormLabelLocalisation,
  IDeveloperProfileLocalisation,
  IProducer,
  IProducerProfileFormLabelLocalisation,
  IProducerProfileLocalisation,
  IStatusesLocalisation
} from 'hsu-library';
import { IPermissionManagerService } from '../../../services/permissions/ipermission-manager.service';
import { PERMISSIONS } from '../../../services/permissions/permissions';
import { profileConfig, IProfileConfig } from '../profile.config';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { IDeveloperService } from '../../../services/user/profile/ideveloper.service';
import { IProducerService } from '../../../services/user/profile/iproducer.service';
import { IAdminService } from '../../../services/user/profile/iadmin.service';

export enum ProfileType {
  UNDEFINED = 'undefined',
  DEVELOPER = 'developer',
  PRODUCER = 'producer',
  ADMIN = 'admin',
}

@Component({
  selector: 'edit-current-profile',
  templateUrl: './edit-current-profile.component.html',
})
export class EditCurrentProfileComponent implements OnInit {
  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  protected readonly adminProfileLocalisation: IAdminProfileLocalisation;

  protected readonly developerProfileLocalisation: IDeveloperProfileLocalisation;

  protected readonly producerProfileLocalisation: IProducerProfileLocalisation;

  protected readonly ProfileType: typeof ProfileType = ProfileType;

  protected readonly profileConfig: IProfileConfig = profileConfig;

  protected admin: IAdmin = {};

  protected developer: IDeveloper = {};

  protected producer: IProducer = {};

  protected profileType: ProfileType = ProfileType.UNDEFINED;

  protected readonly producerRatingMaxValue: number = profileConfig.producerRatingMaxValue;

  constructor(
    private readonly permissionService: IPermissionManagerService,
    private readonly localizationService: AppLocalizationService,
    private readonly developerService: IDeveloperService,
    private readonly producerService: IProducerService,
    private readonly adminService: IAdminService,
  ) {
    this.adminProfileLocalisation = this.getAdminProfileLocalisation();
    this.developerProfileLocalisation = this.getDeveloperProfileLocalisation();
    this.producerProfileLocalisation = this.getProducerProfileLocalisation();
  }

  ngOnInit() {
    this.setProfileType();
    this.initializeProfile();
  }

  onUpdateAdmin(admin: IAdmin) {
    this.adminService.updateCurrentAdmin(admin).subscribe(
      (updatedAdmin: IAdmin) => {
        this.admin = updatedAdmin;
        this.onClose.emit();
      });
  }

  onUpdateDeveloper(developer: IDeveloper) {
    this.developerService.updateCurrentDeveloper(developer).subscribe(
      (updatedDeveloper: IDeveloper) => {
        this.developer = updatedDeveloper;
        this.onClose.emit();
      });
  }

  onUpdateProducer(producer: IProducer) {
    this.producerService.updateCurrentProducer(producer).subscribe(
      (updatedProducer: IProducer) => {
        this.producer = updatedProducer;
        this.onClose.emit();
      });
  }

  private initializeProfile() {
    if (this.profileType === ProfileType.DEVELOPER) {
      this.developerService.getCurrentDeveloper().subscribe(
        (loadedDeveloper: IDeveloper) => {
          this.developer = loadedDeveloper;

        });
    }
    if (this.profileType === ProfileType.PRODUCER) {
      this.producerService.getCurrentProducer().subscribe(
        (loadedProducer: IProducer) => {
          this.producer = loadedProducer;
        });
    }
    if (this.profileType === ProfileType.ADMIN) {
      this.adminService.getCurrentAdmin().subscribe(
        (loadedAdmin: IAdmin) => {
          this.admin = loadedAdmin;
        });
    }
  }

  private setProfileType() {
    if (this.permissionService.isGranted(PERMISSIONS.users.profiles.CurrentAdminProfile)) {
      this.profileType = ProfileType.ADMIN;
    }
    if (this.permissionService.isGranted(PERMISSIONS.users.profiles.CurrentDeveloperProfile)) {
      this.profileType = ProfileType.DEVELOPER;
    }
    if (this.permissionService.isGranted(PERMISSIONS.users.profiles.CurrentProducerProfile)) {
      this.profileType = ProfileType.PRODUCER;
    }
  }

  private getDeveloperProfileLocalisation(): IDeveloperProfileLocalisation {
    const labels: IDeveloperProfileFormLabelLocalisation = {
      fullName: this.localizationService.loc('EditProfile.Developer.Name'),
      pseudonym: this.localizationService.loc('EditProfile.Developer.PseudonymName'),
      street: this.localizationService.loc('EditProfile.Developer.StreetAndNumber'),
      zipCode: this.localizationService.loc('EditProfile.Developer.ZipCode'),
      city: this.localizationService.loc('EditProfile.Developer.City'),
      region: this.localizationService.loc('EditProfile.Developer.RegionOrState'),
      country: this.localizationService.loc('EditProfile.Developer.Country'),
      email: this.localizationService.loc('EditProfile.Developer.EmailAddress'),
      phoneNumber: this.localizationService.loc('EditProfile.Developer.PhoneNumber'),
      state: this.localizationService.loc('EditProfile.Developer.State'),
      save: this.localizationService.loc('EditProfile.Developer.Save'),
      cancel: this.localizationService.loc('EditProfile.Developer.Cancel'),
    }
    return {
      popupTitle: this.localizationService.loc('EditProfile.Developer.PopupTitle'),
      popupSubtitle: this.localizationService.loc('EditProfile.Developer.PopupSubtitle'),
      isActiveState: this.localizationService.loc('Profile.State.Active'),
      isInactiveState: this.localizationService.loc('Profile.State.InActive'),
      labels: labels,
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
    };
  }

  private getProducerProfileLocalisation(): IProducerProfileLocalisation {
    const labels: IProducerProfileFormLabelLocalisation = {
      cancel: this.localizationService.loc('EditProfile.Producer.Cancel'),
      city: this.localizationService.loc('EditProfile.Producer.City'),
      companyName: this.localizationService.loc('EditProfile.Producer.CompanyName'),
      contactPersonFullName: this.localizationService.loc('EditProfile.Producer.ContactPerson'),
      email: this.localizationService.loc('EditProfile.Producer.Mail'),
      numberOfEmployees: this.localizationService.loc('EditProfile.Producer.NumberOfEmployees'),
      phoneNumber: this.localizationService.loc('EditProfile.Producer.PhoneNumber'),
      rate: this.localizationService.loc('EditProfile.Producer.Rate'),
      save: this.localizationService.loc('EditProfile.Producer.Save'),
      state: this.localizationService.loc('EditProfile.Producer.State'),
      street: this.localizationService.loc('EditProfile.Producer.Street'),
      tradeType: this.localizationService.loc('EditProfile.Producer.TradeType'),
      zipCode: this.localizationService.loc('EditProfile.Producer.ZipCode'),
    };
    const statuses: IStatusesLocalisation = {
      active: this.localizationService.loc('Profile.State.Active'),
      inactive: this.localizationService.loc('Profile.State.InActive'),
      invited: this.localizationService.loc('Profile.State.Invited'),
    };
    return {
      rateUnit: this.localizationService.loc('EditProfile.Producer.RateUnit'),
      popupSubtitle: this.localizationService.loc('EditProfile.Producer.PopupSubtitle'),
      popupTitle: this.localizationService.loc('EditProfile.Producer.PopupTitle'),
      parameterTitle: this.localizationService.loc('EditProfile.Producer.ParameterTitle'),
      ratingTitleSeparation: this.localizationService.loc('EditProfile.Producer.RatingTitleSeparation'),
      labels: labels,
      statuses: statuses,
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
    };
  }

  private getAdminProfileLocalisation(): IAdminProfileLocalisation {
    const labels: IAdminProfileFormLabelLocalisation = {
      fullName: this.localizationService.loc('EditProfile.Admin.Name'),
      mail: this.localizationService.loc('EditProfile.Admin.EmailAddress'),
      cancel: this.localizationService.loc('EditProfile.Admin.Cancel'),
      save: this.localizationService.loc('EditProfile.Admin.Save'),
    }
    return {
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
      labels: labels,
      popupSubtitle: this.localizationService.loc('EditProfile.Admin.PopupSubtitle'),
      popupTitle: this.localizationService.loc('EditProfile.Admin.PopupTitle'),
    };
  }
}
