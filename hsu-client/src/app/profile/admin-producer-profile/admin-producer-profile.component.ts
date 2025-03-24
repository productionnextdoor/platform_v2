import {
  Component, Input as RouteParam, OnInit
} from '@angular/core';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import {
  defaultBreadcrumbs,
  EUserStatus,
  IAdminProducerProfileEditLocalisation,
  IAdminProducerProfileViewLocalisation,
  IBreadCrumbLink,
  IBreadcrumbs,
  IPmConfirmPopupLocalisations,
  IProducer,
  PmDropdownOption,
} from 'hsu-library';
import { profileConfig } from '../profile.config';
import { IProducerService } from '../../../services/user/profile/iproducer.service';
import { DropdownService } from '../../../services/user/profile/dropdown.service';
import { Path } from '../../app-routing.module';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { IUserService } from '../../../services/user/iuser.services';
import { ImpersonationService } from '../../../shared/helpers/Impersonation.service';

@Component({
  selector: 'admin-producer-profile',
  templateUrl: './admin-producer-profile.component.html'
})
export class AdminProducerProfileComponent implements OnInit {
  @RouteParam() producerId!: number;

  protected viewProfileLocalisation: IAdminProducerProfileViewLocalisation

  protected editProfileLocalisation: IAdminProducerProfileEditLocalisation;

  protected confirmDeletePopupLocalisation: IPmConfirmPopupLocalisations;
  protected confirmImpersonationPopupLocalisation: IPmConfirmPopupLocalisations;

  protected ratingDropdownOptions: PmDropdownOption<number>[] = [];

  protected stateDropdownOptions: PmDropdownOption<EUserStatus>[] = [];

  protected tradeDropdownOptions: PmDropdownOption<number>[] = [];

  protected producer: IProducer = {};

  protected editPopupIsActive: boolean = false;

  protected confirmDeletePopupIsActive: boolean = false;
  protected confirmImpersonationPopupIsActive: boolean = false;

  ratingMaxValue: number = profileConfig.producerRatingMaxValue;

  constructor(
    private readonly producerService: IProducerService,
    private readonly userService: IUserService,
    private readonly localizationService: AppLocalizationService,
    private readonly dropdownService: DropdownService,
    private readonly navigationService: INavigationService,
    private readonly impersonationService: ImpersonationService
  ) {
    this.viewProfileLocalisation = this.getAdminProducerProfileViewLocalisation();
    this.editProfileLocalisation = this.getAdminProducerProfileEditLocalisation();
    this.confirmDeletePopupLocalisation = this.getConfirmDeletePopupLocalisation();
    this.confirmImpersonationPopupLocalisation = this.getConfirmImpersonationPopupLocalisation();
  }

  ngOnInit() {
    this.loadProducer(this.producerId);
  }

  saveProducer(producer: IProducer) {
    this.producerService.updateProducer(producer).subscribe(
      (updatedProducer: IProducer) => {
        this.producer = updatedProducer;
        this.closeEditPopup();
        this.createOrUpdateDropdowns();
      });
  }

  openEditPopup() {
    this.editPopupIsActive = true;
    this.loadProducer(this.producerId);
  }

  closeEditPopup() {
    this.editPopupIsActive = false;
  }

  deleteProducer() {
    this.userService.deleteUserProfile(this.producerId).subscribe(() => {
      this.navigationService.navigate(Path.PRODUCER_OVERVIEW);
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
    if (!this.producer.companyName) {
      return defaultBreadcrumbs;
    }
    const linkToOverview: IBreadCrumbLink | null = this.navigationService.generateBreadcrumbLink(Path.PRODUCER_OVERVIEW);
    if (!linkToOverview) {
      return defaultBreadcrumbs;
    }
    return {
      breadcrumbLinks: [linkToOverview],
      lastBreadcrumb: this.producer.companyName
    }
  }

  loginAsProducer() {
    if (!this.producer.userId) {
      return;
    }
    this.impersonationService.impersonateUser(this.producer.userId, undefined);
  }

  private createOrUpdateDropdowns() {
    this.ratingDropdownOptions = this.dropdownService.getRatingDropdownOptions(this.ratingMaxValue);
    this.stateDropdownOptions = this.dropdownService.getStateDropdownOptions();
    this.tradeDropdownOptions = this.dropdownService.getTradeTypeDropdownOptions(this.producer?.tradeTypes ?? []);
  }

  private loadProducer(producerId: number) {
    this.producerService.getProducerById(producerId)
      .subscribe((producer: IProducer) => {
        this.producer = producer;
        this.createOrUpdateDropdowns();
      });
  }

  private getAdminProducerProfileViewLocalisation(): IAdminProducerProfileViewLocalisation {
    return {
      companyInformationTitle: this.localizationService.loc('AdminProducerProfileView.Titles.CompanyInformation'),
      parameterTitle: this.localizationService.loc('AdminProducerProfileView.Titles.Parameter'),
      productsAndServicesTitle: this.localizationService.loc('AdminProducerProfileView.Titles.ProductsAndServices'),
      labels: {
        companyName: this.localizationService.loc('AdminProducerProfileView.Labels.CompanyName'),
        tradeType: this.localizationService.loc('AdminProducerProfileView.Labels.TradeType'),
        email: this.localizationService.loc('AdminProducerProfileView.Labels.Mail'),
        numberOfEmployees: this.localizationService.loc('AdminProducerProfileView.Labels.NumberOfEmployees'),
        phoneNumber: this.localizationService.loc('AdminProducerProfileView.Labels.PhoneNumber'),
        zipCode: this.localizationService.loc('AdminProducerProfileView.Labels.ZipCode'),
        city: this.localizationService.loc('AdminProducerProfileView.Labels.City'),
        street: this.localizationService.loc('AdminProducerProfileView.Labels.Street'),
        note: this.localizationService.loc('AdminProducerProfileView.Labels.Note'),
        associatedProducts: this.localizationService.loc('AdminProducerProfileView.Labels.AssociatedProducts'),
        alreadyProducedFurniture: this.localizationService.loc('AdminProducerProfileView.Labels.AlreadyProducedFurniture'),
        currentOrders: this.localizationService.loc('AdminProducerProfileView.Labels.CurrentOrders'),
      },
      statuses: {
        active:  this.localizationService.loc('Profile.State.Active'),
        inactive:  this.localizationService.loc('Profile.State.InActive'),
        invited:  this.localizationService.loc('Profile.State.Invited')
      },
      ratingTitleSeparation: this.localizationService.loc('AdminProducerProfileView.Ratings.TitleSeparation'),
    };
  }

  private getAdminProducerProfileEditLocalisation(): IAdminProducerProfileEditLocalisation {
    return {
      parameterTitle: this.localizationService.loc('AdminProducerProfileEdit.ParameterTitle'),
      popupSubtitle: this.localizationService.loc('AdminProducerProfileEdit.PopupSubtitle'),
      popupTitle: this.localizationService.loc('AdminProducerProfileEdit.PopupTitle'),
      rateUnit: this.localizationService.loc('AdminProducerProfileEdit.RateUnit'),
      ratingTitleSeparation: this.localizationService.loc('AdminProducerProfileEdit.RatingTitleSeparation'),
      ratingValueSeparator: this.localizationService.loc('AdminProducerProfileEdit.RatingValueSeparator'),
      notePlaceholder: this.localizationService.loc('AdminProducerProfileEdit.NotePlaceholder'),
      undefinedRating: this.localizationService.loc('AdminProducerProfileEdit.UndefinedRating'),
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
      labels: {
        cancel: this.localizationService.loc('AdminProducerProfileEdit.Labels.Cancel'),
        city: this.localizationService.loc('AdminProducerProfileEdit.Labels.City'),
        companyName: this.localizationService.loc('AdminProducerProfileEdit.Labels.CompanyName'),
        contactPersonFullName: this.localizationService.loc('AdminProducerProfileEdit.Labels.ContactPersonFullName'),
        email: this.localizationService.loc('AdminProducerProfileEdit.Labels.Mail'),
        numberOfEmployees: this.localizationService.loc('AdminProducerProfileEdit.Labels.NumberOfEmployees'),
        phoneNumber: this.localizationService.loc('AdminProducerProfileEdit.Labels.PhoneNumber'),
        rate: this.localizationService.loc('AdminProducerProfileEdit.Labels.Rate'),
        save: this.localizationService.loc('AdminProducerProfileEdit.Labels.Save'),
        state: this.localizationService.loc('AdminProducerProfileEdit.Labels.State'),
        street: this.localizationService.loc('AdminProducerProfileEdit.Labels.Street'),
        tradeType: this.localizationService.loc('AdminProducerProfileEdit.Labels.TradeType'),
        zipCode: this.localizationService.loc('AdminProducerProfileEdit.Labels.ZipCode'),
        note: this.localizationService.loc('AdminProducerProfileEdit.Labels.Note'),
      },
      statuses: {
        active: this.localizationService.loc('Profile.State.Active'),
        inactive: this.localizationService.loc('Profile.State.InActive'),
        invited: this.localizationService.loc('Profile.State.Invited'),
      },
    };
  }

  private getConfirmDeletePopupLocalisation(): IPmConfirmPopupLocalisations {
    return {
      title: this.localizationService.loc('AdminProfile.ConfirmDeletePopup.Title', this.localizationService.loc('RoleName.Producer')),
      description: this.localizationService.loc('AdminProfile.ConfirmDeletePopup.Description', this.localizationService.loc('RoleName.Producer')),
      confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
      cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
    }
  }

  private getConfirmImpersonationPopupLocalisation(): IPmConfirmPopupLocalisations {
    return {
      title: this.localizationService.loc('AdminProfile.ConfirmImpersonationPopup.Title', this.localizationService.loc('RoleName.Producer')),
      description: this.localizationService.loc('AdminProfile.ConfirmImpersonationPopup.Description', this.localizationService.loc('RoleName.Producer')),
      confirm: this.localizationService.loc('ConfirmPopup.Default.Confirm'),
      cancel: this.localizationService.loc('ConfirmPopup.Default.Cancel'),
    }
  }
}
