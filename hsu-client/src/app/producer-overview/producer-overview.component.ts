import {
  Component, OnInit
} from '@angular/core';
import {
  IProducerOverviewLocalisation,
  ESortOrder,
  IColumnHeader,
  IColumnSortEvent,
  IActionEvent,
  Row,
  PmDropdownOption,
  IPager,
  Pager,
  IInviteProducerPopupLocalisations,
  IProducerBaseData
} from 'hsu-library';
import { AppLocalizationService } from '../../services/localization/app-localization.service';
import { WithRx } from '../../shared/mixins/with-rx.mixin';
import {
  EProducerOverviewColumns,
  ProducerOverviewTableService
} from '../../services/producer/producer-overview-table.service';
import {
  IProducerFilter,
  ProducerApiService
} from '../../services/producer/producer-api.service';
import {
  debounceTime, distinctUntilChanged, filter, finalize, map, Subject, tap
} from 'rxjs';
import {
  PagedResultDtoOfProducerOverviewOutput,
  ProducerOverviewOutput
} from '../../shared/service-proxies/service-proxies';
import {
  DEBOUNCE_TIME, DEFAULT_PER_PAGE, MIN_SEARCH_LENGTH
} from '../../services/table/table-base.service';
import { PERMISSIONS } from '../../services/permissions/permissions';
import { IPermissionManagerService } from '../../services/permissions/ipermission-manager.service';
import { Path } from '../app-routing.module';
import { INavigationService } from '../../services/navigation/inavigation.service';
import { IProducerRegistrationService } from '../../services/user/registration/iproducer-registration.service';

@Component({
  selector: 'producer-overview',
  templateUrl: './producer-overview.component.html',
})
export class ProducerOverviewComponent extends WithRx() implements OnInit{

  protected loading: boolean = false;
  protected rowData: Row[] = [];
  protected columnHeaders: IColumnHeader[] = [];
  protected producers: ProducerOverviewOutput[] = [];
  protected sorting: string = '';
  protected totalItems: number = 0;
  protected itemsPerPageOptions: PmDropdownOption<string>[] = [];
  protected paginationData: IPager = Pager;
  protected isAdmin: boolean = false;
  protected showInvitePopup: boolean = false;
  protected tradeDropdownOptions: PmDropdownOption<number>[] = [];

  protected producerFilter: IProducerFilter = {
    maxResultCount: DEFAULT_PER_PAGE,
    skipCount: 0,
    sortOrder: EProducerOverviewColumns.CompanyColumn + ' ' + ESortOrder.Descending,
    searchInput: '',
  };

  protected overviewLocalisations: IProducerOverviewLocalisation;
  protected popupLocalisations: IInviteProducerPopupLocalisations;

  private filterQuery$ = new Subject<IProducerFilter>();

  constructor(
    private readonly localizationService: AppLocalizationService,
    private readonly producerApiService: ProducerApiService,
    private readonly producerOverviewTableService: ProducerOverviewTableService,
    private readonly permissionService: IPermissionManagerService,
    private readonly navigationService: INavigationService,
    private readonly producerRegistrationService: IProducerRegistrationService
  ) {
    super();
    this.overviewLocalisations = {
      totalText: this.localizationService.loc('ProductTableTexts.Total'),
      titleProducerOverview: this.localizationService.loc('ProducerOverview.Title'),
      searchBarLabel: this.localizationService.loc('ProducerOverview.SearchBar.Label'),
      searchBarPlaceholder: this.localizationService.loc('ProducerOverview.SearchBar.Placeholder'),
      inviteButtonLabel: this.localizationService.loc('ProducerOverview.InviteButton.Label')
    }
    this.popupLocalisations = {
      title: this.localizationService.loc('InviteProducerPopup.Title'),
      description: this.localizationService.loc('InviteProducerPopup.Description'),
      form: {
        title: this.localizationService.loc('InviteProducerPopup.Form.Title'),
        companyNameLabel: this.localizationService.loc('InviteProducerPopup.Form.CompanyName.Label'),
        companyNamePlaceholder: this.localizationService.loc('InviteProducerPopup.Form.CompanyName.Placeholder'),
        tradeLabel: this.localizationService.loc('InviteProducerPopup.Form.Trade.Label'),
        tradePlaceholder: this.localizationService.loc('InviteProducerPopup.Form.Trade.Placeholder'),
        emailLabel: this.localizationService.loc('InviteProducerPopup.Form.Email.Label'),
        emailPlaceholder: this.localizationService.loc('InviteProducerPopup.Form.Email.Placeholder'),
        contactPersonLabel: this.localizationService.loc('InviteProducerPopup.Form.ContactPerson.Label'),
        contactPersonPlaceholder: this.localizationService.loc('InviteProducerPopup.Form.ContactPerson.Placeholder'),
      },
      cancelButtonLabel: this.localizationService.loc('InviteProducerPopup.ButtonText.Cancel'),
      inviteButtonLabel: this.localizationService.loc('InviteProducerPopup.ButtonText.Invite'),
      emailNotValidError: this.localizationService.loc('ForgotPassword.Form.EmailNotValid'),
    }
  }

  ngOnInit() {
    this.initProducerFilter();
    this.columnHeaders = this.producerOverviewTableService.getProducerOverviewColumnHeaders(this.canViewProducerProfile());
    this.itemsPerPageOptions = this.producerOverviewTableService.getPaginationOptions();
    this.setProducerOverviewTableData();
    this.filterQuery$.next(this.producerFilter);
    this.checkForAdminPermission();
    this.producerRegistrationService.getTradeTypes().subscribe(options => {
      this.tradeDropdownOptions = options;
    });
  }

  onSortingClicked(sortEvent: IColumnSortEvent) {
    this.filterQuery$.next({
      ...this.producerFilter,
      sortOrder: sortEvent.columnIdentifier + ' ' + sortEvent.sortOrder
    });
  }

  onPageClicked(pager: IPager) {
    this.paginationData = pager;
    this.filterQuery$.next({
      ...this.producerFilter,
      skipCount: pager.SkipCount,
      maxResultCount: pager.MaxResultCount
    });
    this.setProducerOverviewTableData();
  }

  onSearchTermChanged(searchValue: string) {
    this.resetPagination();
    this.filterQuery$.next({
      ...this.producerFilter,
      searchInput: searchValue,
    });
  }

  onInviteProducer(producerBaseData: IProducerBaseData) {
    this.producerRegistrationService.inviteProducer(producerBaseData)
      .subscribe(this.closeInvitePopup.bind(this));
  }

  openInvitePopup() {
    this.showInvitePopup = true;
  }

  closeInvitePopup() {
    this.showInvitePopup = false;
  }

  private setProducerOverviewTableData (){
    this.producerApiService.getFilteredProducers(this.producerFilter).pipe(
      map(result => {
        this.setProducerOverviewRowData(result);
      })
    ).subscribe();
  }

  private setProducerOverviewRowData(producerData: PagedResultDtoOfProducerOverviewOutput) {
    this.totalItems = producerData.totalCount;
    this.producers = producerData.items ?? [];
    this.rowData = this.producers.map(item => (
      this.producerOverviewTableService.getProducerOverviewTableRow(this.canViewProducerProfile(),item)
    ));
  }

  private resetPagination() {
    this.paginationData.CurrentPage = 1;
    this.producerFilter.skipCount = 0;
  }

  private initProducerFilter() {
    this.filterQuery$
      .pipe(
        filter(query => query.searchInput.length >= MIN_SEARCH_LENGTH || query.searchInput.length === 0),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        tap(producerFilter => this.producerFilter = producerFilter),
        this.switchMapCancelable(() => this.producerApiService.getFilteredProducers(this.producerFilter)),
        finalize(() => this.loading = false)
      )
      .subscribe(
        {
          next: (result) => {
            this.setProducerOverviewRowData(result);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
  }

  protected canViewProducerProfile(): boolean {
    return this.permissionService.isGranted(PERMISSIONS.users.profiles.ProducerProfile.get);
  }

  onViewProducerDetails(actionEvent: IActionEvent) {
    this.navigationService.navigate(Path.ADMIN_PRODUCER_PROFILE, actionEvent.rowId)
  }

  private checkForAdminPermission() {
    if (this.permissionService.isGranted(PERMISSIONS.users.profiles.AdminProfile.get)) {
      this.isAdmin = true;
    }
  }
}
