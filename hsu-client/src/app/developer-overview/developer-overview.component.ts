import {
  Component,
  OnInit
} from '@angular/core';
import { AppLocalizationService } from '../../services/localization/app-localization.service';
import { WithRx } from '../../shared/mixins/with-rx.mixin';
import {
  IActionEvent,
  IDeveloperOverviewLocalisation,
  IColumnHeader,
  IColumnSortEvent,
  ESortOrder,
  Row,
  PmDropdownOption,
  IPager,
  Pager,
  IDeveloperBaseData,
  IInviteDeveloperPopupLocalisations,
} from 'hsu-library';
import {
  DeveloperTableService,
  EDeveloperOverviewColumns
} from '../../services/developer/developer-table.service';

import {
  DEBOUNCE_TIME,
  DEFAULT_PER_PAGE,
  MIN_SEARCH_LENGTH
} from '../../services/table/table-base.service';
import {
  DeveloperOverviewOutput,
  PagedResultDtoOfDeveloperOverviewOutput
} from '../../shared/service-proxies/service-proxies';
import {
  DeveloperApiService,
  IDeveloperFilter
} from '../../services/developer/developer-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Subject,
  tap
} from 'rxjs';
import { IDeveloperRegistrationService } from '../../services/user/registration/ideveloper-registration.service';
import { INavigationService } from '../../services/navigation/inavigation.service';
import { Path } from '../app-routing.module';

@Component({
  selector: 'developer-overview',
  templateUrl: './developer-overview.component.html',
})

export class DeveloperOverviewComponent extends WithRx() implements OnInit {

  protected loading: boolean = false;
  protected columnHeaders: IColumnHeader[] = [];
  protected rowData: Row[] = [];
  protected developers: DeveloperOverviewOutput[] = [];
  protected sorting: string = '';
  protected totalItems: number = 0;
  protected itemsPerPageOptions: PmDropdownOption<string>[] = [];
  protected paginationData: IPager = Pager;
  protected overviewLocalisations: IDeveloperOverviewLocalisation;

  protected developerFilter: IDeveloperFilter = {
    maxResultCount: DEFAULT_PER_PAGE,
    skipCount: 0,
    sortOrder: EDeveloperOverviewColumns.NameColumn + ' ' + ESortOrder.Descending,
    searchInput: '',
  };

  private filterQuery$ = new Subject<IDeveloperFilter>();

  //Invite developer Popup
  protected showInvitePopup: boolean = false;

  protected popupLocalisations: IInviteDeveloperPopupLocalisations;

  constructor(
    private readonly localizationService: AppLocalizationService,
    private readonly developerApiService: DeveloperApiService,
    private readonly developerTableService: DeveloperTableService,
    private readonly developerRegistrationService: IDeveloperRegistrationService,
    private readonly navigationService: INavigationService
  ) {
    super();
    this.overviewLocalisations = {
      totalText: this.localizationService.loc('ProductTableTexts.Total'),
      titleDeveloperOverview: this.localizationService.loc('DeveloperOverview.Title'),
      searchBarLabel: this.localizationService.loc('DeveloperOverview.SearchBar.Label'),
      searchBarPlaceholder: this.localizationService.loc('DeveloperOverview.SearchBar.Placeholder'),
      buttonLabel: this.localizationService.loc('DeveloperOverview.Button.Label')
    }
    this.popupLocalisations = {
      title: this.localizationService.loc('InviteDeveloperPopup.Title'),
      description: this.localizationService.loc('InviteDeveloperPopup.Description'),
      subTitle: this.localizationService.loc('InviteDeveloperPopup.SubTitle'),
      inputNameLabel: this.localizationService.loc('InviteDeveloperPopup.InputName.Label'),
      inputNamePlaceholder: this.localizationService.loc('InviteDeveloperPopup.InputName.Placeholder'),
      inputMailLabel: this.localizationService.loc('InviteDeveloperPopup.InputMail.Label'),
      inputMailPlaceholder: this.localizationService.loc('InviteDeveloperPopup.InputMail.Placeholder'),
      cancelLabel: this.localizationService.loc('InviteDeveloperPopup.CancelButton.Label'),
      inviteLabel: this.localizationService.loc('InviteDeveloperPopup.InviteButton.Label'),
      emailNotValidError: this.localizationService.loc('ForgotPassword.Form.EmailNotValid'),
    }
  }

  ngOnInit() {
    this.initDeveloperFilter();
    this.columnHeaders = this.developerTableService.getDeveloperOverviewColumnHeaders();
    this.itemsPerPageOptions = this.developerTableService.getPaginationOptions();
    this.setDeveloperOverviewTableData();
    this.filterQuery$.next(this.developerFilter);
  }

  onSortingClicked(sortEvent: IColumnSortEvent) {
    this.filterQuery$.next({
      ...this.developerFilter,
      sortOrder: sortEvent.columnIdentifier + ' ' + sortEvent.sortOrder
    });
  }

  onPageClicked(pager: IPager) {
    this.paginationData = pager;
    this.filterQuery$.next({
      ...this.developerFilter,
      skipCount: pager.SkipCount,
      maxResultCount: pager.MaxResultCount
    });
    this.setDeveloperOverviewTableData();
  }

  onSearchTermChanged(searchValue: string) {
    this.resetPagination();
    this.filterQuery$.next({
      ...this.developerFilter,
      searchInput: searchValue,
    });
  }

  onInviteDeveloper(developerBaseData: IDeveloperBaseData) {
    this.developerRegistrationService.inviteDeveloper(developerBaseData)
      .subscribe(this.closeInvitePopup.bind(this));
  }

  onActionClicked(actionEvent: IActionEvent) {
    const developerId: number = actionEvent.rowId;
    this.navigationService.navigate(Path.ADMIN_DEVELOPER_PROFILE, developerId);
  }

  protected openInvitePopup(){
    this.showInvitePopup = true;
  }

  protected closeInvitePopup(){
    this.showInvitePopup = false;
  }

  private setDeveloperOverviewTableData() {
    this.developerApiService.getFilteredDevelopers(this.developerFilter).pipe(
      map(result => {
        this.setDeveloperOverviewRowData(result);
      })
    ).subscribe();
  }

  private setDeveloperOverviewRowData(developerData: PagedResultDtoOfDeveloperOverviewOutput) {
    this.totalItems = developerData.totalCount;
    this.developers = developerData.items ?? [];
    this.rowData = this.developers.map(item => (
      this.developerTableService.getDeveloperOverviewTableRow(item)
    ));
  }

  private resetPagination() {
    this.paginationData.CurrentPage = 1;
    this.developerFilter.skipCount = 0;
  }

  private initDeveloperFilter() {
    this.filterQuery$
      .pipe(
        filter(query => query.searchInput.length >= MIN_SEARCH_LENGTH || query.searchInput.length === 0),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        tap(developerFilter => this.developerFilter = developerFilter),
        this.switchMapCancelable(() => this.developerApiService.getFilteredDevelopers(this.developerFilter)),
        finalize(() => this.loading = false)
      )
      .subscribe(
        {
          next: (result) => {
            this.setDeveloperOverviewRowData(result);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
  }
}
