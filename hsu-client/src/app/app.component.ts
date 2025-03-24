import {
  Component,
  DestroyRef,
  OnInit
} from '@angular/core';
import {
  Icon,
  IMenuItem,
  IMenuSelectEvent,
  IContactCardLocalisation,
  IContactCardContacts,
  IContactCardEvent,
  IContactCardLink
} from 'hsu-library';
import { INavigationService } from '../services/navigation/inavigation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAuthService } from '../services/account/iauth.service';
import { Path } from './app-routing.module';
import { AppLocalizationService } from '../services/localization/app-localization.service';
import { PERMISSIONS } from '../services/permissions/permissions';
import { IPermissionManagerService } from '../services/permissions/ipermission-manager.service';
import { ImpersonationService } from '../shared/helpers/Impersonation.service';
import { AppConsts } from '../shared/AppConsts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

  /** @ignore */
  protected readonly contactLocalisations: IContactCardLocalisation;

  /** @ignore */
  protected readonly contacts: IContactCardContacts;

  title: string = 'hsu-client';

  logoPath: string = '';

  isFullScreen: boolean = true;

  menuItems: IMenuItem<Path>[] = [
    {
      menuId: 1,
      logo: Icon.PRODUCT_OVERVIEW,
      text: this.localizationService.loc('Menu.Products'),
      path: Path.PRODUCTS,
      subPaths: [Path.PRODUCT_DETAILS],
      accessPermissions: [
        PERMISSIONS.products.overview.admin,
        PERMISSIONS.products.overview.developer,
        PERMISSIONS.products.overview.producer
      ]
    },
    {
      menuId: 2,
      logo: Icon.DEVELOPER,
      text: this.localizationService.loc('Menu.Developer'),
      path: Path.DEVELOPER_OVERVIEW,
      subPaths: [Path.ADMIN_DEVELOPER_PROFILE],
      accessPermissions: [
        PERMISSIONS.users.getDevelopers
      ]
    },
    {
      menuId: 3,
      logo: Icon.PRODUCERS,
      text: this.localizationService.loc('Menu.Producer'),
      path: Path.PRODUCER_OVERVIEW,
      subPaths: [Path.ADMIN_PRODUCER_PROFILE],
      accessPermissions: [
        PERMISSIONS.users.getProducers
      ]
    },
    {
      menuId: 4,
      logo: Icon.ORDER_OVERVIEW,
      text: this.localizationService.loc('Menu.OrderOverview'),
      path: Path.ORDERS,
      subPaths: [Path.ORDER_DETAILS],
      accessPermissions: [
        PERMISSIONS.orderManagement.overview.admin,
        PERMISSIONS.orderManagement.overview.producer
      ]
    },
    {
      menuId: 5,
      logo: Icon.PDF_FILE,
      text: this.localizationService.loc('Menu.Statistics'),
      path: Path.STATISTICS,
      subPaths: [],
      accessPermissions: [
        PERMISSIONS.orderManagement.overview.admin
      ]
    },
  ];

  contactCardLinks: IContactCardLink<Path>[] = AppConsts
    .getImprintLinks(this.localizationService.loc('TermsAndConditions.Title'), this.localizationService.loc('PrivacyPolicy.Title'))
    .map(item => {
      return {
        ...item,
        icon: Icon.ORDER_OVERVIEW
      };
    });

  accessibleMenuItems: IMenuItem<Path>[] = [];

  activeMenuId: number = this.menuItems[0].menuId;

  hasProfileOpen: boolean = false;

  constructor(
    private navigationService: INavigationService,
    private authService: IAuthService,
    private destroyRef: DestroyRef,
    private readonly localizationService: AppLocalizationService,
    private readonly permissionService: IPermissionManagerService,
    private readonly impersonationService: ImpersonationService
  ) {
    this.contactLocalisations = {
      title: this.localizationService.loc('Menu.ContactCard.Title'),
      text: this.localizationService.loc('Menu.ContactCard.Text'),
    }
    this.contacts = {
      emailAddress: this.localizationService.loc('Menu.ContactCard.EmailAddress'),
      phoneNumber: this.localizationService.loc('Menu.ContactCard.PhoneNumber'),
    }
  }

  ngOnInit(): void {
    this.navigationService.shouldFullscreen()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(isFullScreen => {
      this.isFullScreen = isFullScreen;
    });

    this.navigationService.currentPathChanges()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(path => {
      this.activeMenuId = this.menuItems.find(item => item.path === path || item.subPaths.includes(path))?.menuId ?? this.menuItems[0].menuId;
    });

    this.logoPath = this.navigationService.getLogoPath();
    this.initAccessibleMenuItems();
  }

  onCloseProfile(): void {
    this.hasProfileOpen = false;
  }

  onHandleLogout(): void {
    if (!this.authService.isTokenValid()) {
      this.navigationService.navigate(Path.LOGIN);
      return;
    }
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isTokenValid();
  }

  isImpersonatedLogin(): boolean {
    return this.impersonationService.isCurrentAuthUserImpersonated();
  }

  onLogoutImpersonation(): void {
    this.impersonationService.backToImpersonator();
  }

  /**
   * @description This method is for handling the menu item selection to set the active state.
   * @param event
   */
  onSelectMenuItem(event: IMenuSelectEvent): void {
    this.activeMenuId = event.activeId;
    this.navigationService.navigate(
      this.menuItems.find(item => item.menuId === this.activeMenuId)?.path ?? Path.DEFAULT
    );
  }

  /**
   * @description This method is for handling the info card item selection to navigate to the respective path.
   * @param event
   */
  onSelectContactCardItem(event: IContactCardEvent<Path>): void {
    this.activeMenuId = -1;
    this.navigationService.navigate(event.item.path ?? Path.DEFAULT);
  }

  initAccessibleMenuItems(): void {
    this.accessibleMenuItems = this.menuItems.filter(item => {
      return this.permissionService.isGrantedAny(item.accessPermissions);
    });
  }
}
