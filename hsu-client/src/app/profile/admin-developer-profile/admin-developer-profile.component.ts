import {
  Component, Input as RouteParam, OnInit
} from '@angular/core';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import {
  defaultBreadcrumbs,
  EUserStatus,
  IAdminDeveloperProfileEditLocalisation,
  IAdminDeveloperProfileViewLocalisation,
  IBreadCrumbLink,
  IBreadcrumbs,
  IDeveloper,
  IPmConfirmPopupLocalisations,
  PmDropdownOption
} from 'hsu-library';
import { IDeveloperService } from '../../../services/user/profile/ideveloper.service';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { Path } from '../../app-routing.module';
import { DropdownService } from '../../../services/user/profile/dropdown.service';
import { IUserService } from '../../../services/user/iuser.services';
import { IProductApiService } from '../../../services/products/iproduct-api.service';
import { ImpersonationService } from '../../../shared/helpers/Impersonation.service';
import { DeveloperProductInvolvementDto } from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'admin-developer-profile',
  templateUrl: './admin-developer-profile.component.html'
})
export class AdminDeveloperProfileComponent implements OnInit  {
  @RouteParam()
  developerId!: number;

  protected viewProfileLocalisation: IAdminDeveloperProfileViewLocalisation

  protected editProfileLocalisation: IAdminDeveloperProfileEditLocalisation

  protected confirmDeletePopupLocalisation: IPmConfirmPopupLocalisations;
  protected confirmImpersonationPopupLocalisation: IPmConfirmPopupLocalisations;
  protected confirmRemoveFromProductsPopupLocalisation: IPmConfirmPopupLocalisations;
  protected confirmDeleteProfilePopupLocalisation: IPmConfirmPopupLocalisations;

  protected stateDropdownOptions: PmDropdownOption<EUserStatus>[] = [];

  protected developer: IDeveloper = {};
  protected developerProductInvolvements: DeveloperProductInvolvementDto[] = [];

  protected breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  protected editPopupIsActive: boolean = false;

  protected confirmDeletePopupIsActive: boolean = false;
  protected confirmImpersonationPopupIsActive: boolean = false;


  // eslint-disable-next-line max-params
  constructor(
    private readonly developerService: IDeveloperService,
    private readonly userService: IUserService,
    private readonly productApiService: IProductApiService,
    private readonly dropdownService: DropdownService,
    private readonly localizationService: AppLocalizationService,
    private readonly navigationService: INavigationService,
    private readonly impersonationService: ImpersonationService
  ) {
    this.viewProfileLocalisation = this.getAdminDeveloperProfileViewLocalisation();
    this.editProfileLocalisation = this.getAdminDeveloperProfileEditLocalisation();
    this.confirmDeletePopupLocalisation = this.getConfirmDeletePopupLocalisation();
    this.confirmImpersonationPopupLocalisation = this.getConfirmImpersonationPopupLocalisation();
    this.confirmRemoveFromProductsPopupLocalisation = this.getConfirmRemoveFromProductsPopupLocalisation();
    this.confirmDeleteProfilePopupLocalisation = this.getConfirmDeleteProfilePopupLocalisation();
  }

  ngOnInit() {
    this.stateDropdownOptions = this.dropdownService.getStateDropdownOptions();
    this.loadDeveloper(this.developerId);
  }

  openEditPopup() {
    this.editPopupIsActive = true;
    this.loadDeveloper(this.developerId);
    this.loadDeveloperProductInvolvements(this.developerId);
  }

  closeEditPopup() {
    this.editPopupIsActive = false;
  }

  saveDeveloper(developer: IDeveloper) {
    this.developerService.updateDeveloper(developer)
      .subscribe((updatedDeveloper: IDeveloper) => {
        this.developer = updatedDeveloper;
        this.closeEditPopup()
      });
  }

  deleteInvitedDeveloper() {
    this.userService.deleteUserProfile(this.developerId).subscribe(() => {
      this.closeConfirmDeletePopup();
      this.navigationService.navigate(Path.DEVELOPER_OVERVIEW);
    });
  }

  openConfirmDeletePopup() {
    this.confirmDeletePopupIsActive = true;
  }

  closeConfirmDeletePopup() {
    this.confirmDeletePopupIsActive = false;
  }

  openConfirmImpersonationPopup() {
    this.confirmImpersonationPopupIsActive = true;
  }

  closeConfirmImpersonationPopup() {
    this.confirmImpersonationPopupIsActive = false;
  }

  getBreadcrumbs(): IBreadcrumbs {
    if (!this.developer.fullName) {
      return defaultBreadcrumbs;
    }
    const linkToOverview: IBreadCrumbLink | null = this.navigationService.generateBreadcrumbLink(Path.DEVELOPER_OVERVIEW);
    if (!linkToOverview) {
      return defaultBreadcrumbs;
    }
    return {
      breadcrumbLinks: [linkToOverview],
      lastBreadcrumb: this.developer.fullName
    }
  }

  loginAsDeveloper() {
    if (!this.developer.userId) {
      return;
    }
    this.impersonationService.impersonateUser(this.developer.userId, undefined);
  }

  deleteDeveloperProfile() {
    this.userService.deleteDeveloperProfile(this.developerId).subscribe(() => {
      this.closeEditPopup();
      this.navigationService.navigate(Path.DEVELOPER_OVERVIEW);
    });
  }

  private loadDeveloperProductInvolvements(developerId: number) {
    this.productApiService.getDeveloperProductInvolvements(developerId)
      .subscribe({
        next: (involvements: DeveloperProductInvolvementDto[]) => {
          this.developerProductInvolvements = involvements;
        },
        error: () => {
          this.developerProductInvolvements = [];
        }
      });
  }

  private loadDeveloper(developerId: number) {
    this.developerService.getDeveloperById(developerId)
      .subscribe((developer: IDeveloper) => {
        this.developer = developer;
      });
  }

  private getAdminDeveloperProfileViewLocalisation(): IAdminDeveloperProfileViewLocalisation {
    return {
      generalInformationTitle: this.localizationService.loc('AdminDeveloperProfileView.Titles.GeneralInformation'),
      labels: {
        city: this.localizationService.loc('AdminDeveloperProfileView.Labels.City'),
        country: this.localizationService.loc('AdminDeveloperProfileView.Labels.Country'),
        email: this.localizationService.loc('AdminDeveloperProfileView.Labels.Email'),
        fullName: this.localizationService.loc('AdminDeveloperProfileView.Labels.FullName'),
        note: this.localizationService.loc('AdminDeveloperProfileView.Labels.Note'),
        numberOfDraftedProducts: this.localizationService.loc('AdminDeveloperProfileView.Labels.NumberOfDraftedProducts'),
        numberOfProducts: this.localizationService.loc('AdminDeveloperProfileView.Labels.NumberOfProducts'),
        phoneNumber: this.localizationService.loc('AdminDeveloperProfileView.Labels.PhoneNumber'),
        pseudonym: this.localizationService.loc('AdminDeveloperProfileView.Labels.Pseudonym'),
        region: this.localizationService.loc('AdminDeveloperProfileView.Labels.Region'),
        street: this.localizationService.loc('AdminDeveloperProfileView.Labels.Street'),
        zipCode: this.localizationService.loc('AdminDeveloperProfileView.Labels.ZipCode'),
      },
      statuses: {
        active: this.localizationService.loc('Profile.State.Active'),
        inactive: this.localizationService.loc('Profile.State.InActive'),
        invited: this.localizationService.loc('Profile.State.Invited'),
      },
      placeholderValue: this.localizationService.loc('AdminDeveloperProfileView.Misc.PlaceholderValue'),
      productInformationTitle: this.localizationService.loc('AdminDeveloperProfileView.Titles.ProductInformation'),
    };
  }

  private getAdminDeveloperProfileEditLocalisation(): IAdminDeveloperProfileEditLocalisation {
    return {
      labels: {
        cancel: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Cancel'),
        city: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.City'),
        country: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Country'),
        email: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Email'),
        fullName: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.FullName'),
        note: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Note'),
        phoneNumber: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.PhoneNumber'),
        pseudonym: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Pseudonym'),
        region: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Region'),
        save: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Save'),
        state: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.State'),
        street: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.Street'),
        zipCode: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.ZipCode'),
        deleteProfile: this.localizationService.loc('AdminDeveloperProfileEdit.Labels.AnonymizeProfile'),
      },
      statuses: {
        active: this.localizationService.loc('Profile.State.Active'),
        inactive: this.localizationService.loc('Profile.State.InActive'),
        invited: this.localizationService.loc('Profile.State.Invited'),
      },
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
      notePlaceholder: this.localizationService.loc('AdminDeveloperProfileEdit.Misc.NotePlaceholder'),
      popupTitle: this.localizationService.loc('AdminDeveloperProfileEdit.Misc.PopupTitle'),
      formTitle: this.localizationService.loc('AdminDeveloperProfileEdit.Misc.FormTitle'),
      formIntroduction: this.localizationService.loc('AdminDeveloperProfileEdit.Misc.FormIntroduction'),
    };
  }

  private getConfirmDeletePopupLocalisation(): IPmConfirmPopupLocalisations {
    return {
      title: this.localizationService.loc('AdminProfile.ConfirmDeletePopup.Title', this.localizationService.loc('RoleName.Developer')),
      description: this.localizationService.loc('AdminProfile.ConfirmDeletePopup.Description', this.localizationService.loc('RoleName.Developer')),
      confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
      cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
    }
  }



  private getConfirmImpersonationPopupLocalisation(): IPmConfirmPopupLocalisations {
    return {
      title: this.localizationService.loc('AdminProfile.ConfirmImpersonationPopup.Title', this.localizationService.loc('RoleName.Developer')),
      description: this.localizationService.loc('AdminProfile.ConfirmImpersonationPopup.Description', this.localizationService.loc('RoleName.Developer')),
      confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
      cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
    }
  }

  private getConfirmRemoveFromProductsPopupLocalisation(): IPmConfirmPopupLocalisations {
    return {
      title: this.localizationService.loc('AdminProfile.ConfirmDeletePopup.Title', this.localizationService.loc('RoleName.Developer')),
      description: this.localizationService.loc('AdminProfile.ConfirmDeleteDeveloperPopup.Description'),
      confirm: this.localizationService.loc('ConfirmPopup.Default.Ok'),
      cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
    }
  }

  private getConfirmDeleteProfilePopupLocalisation(): IPmConfirmPopupLocalisations {
    return {
      title: this.localizationService.loc('AdminProfile.ConfirmAnonymizePopup.Title', this.localizationService.loc('RoleName.Developer')),
      description: this.localizationService.loc('AdminProfile.ConfirmAnonymizePopup.Description', this.localizationService.loc('RoleName.Developer')),
      confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
      cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
    }
  }
}
