import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  INavigationService
} from './inavigation.service';
import {
  BehaviorSubject, EMPTY,
  filter,
  Observable,
} from 'rxjs';
import {
  NavigationEnd,
  Params,
  Router,
  Route,
  UrlTree,
} from '@angular/router';
import {
  Path, RouteData,
} from '../../app/app-routing.module';
import {
  LogService
} from 'abp-ng2-module';
import {
  AppLocalizationService
} from '../localization/app-localization.service';
import {
  Title
} from '@angular/platform-browser';
import {
  IBreadCrumbLink,
} from 'hsu-library';
import { findKey } from 'lodash-es';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class NavigationService extends INavigationService implements OnDestroy {
  private readonly fullScreenObserver$: BehaviorSubject<boolean>;
  private readonly currentPathObserver$: BehaviorSubject<Path>;

  private activeUrl: Path = Path.DEFAULT;
  private redirectUrl: string = Path.DEFAULT;

  constructor(
    private readonly router: Router,
    private readonly logService: LogService,
    private readonly localisationService: AppLocalizationService,
    private readonly titleService: Title,
  ) {
    super();
    this.fullScreenObserver$ = new BehaviorSubject<boolean>(true);
    this.currentPathObserver$ = new BehaviorSubject<Path>(Path.DEFAULT);
    this.handleNavigationEnd();
  }

  ngOnDestroy() {
    this.fullScreenObserver$.complete();
  }

  getLogoPath(): string {
    return 'assets/common/images/logo.svg';
  }

  getLogoTextPath(): string {
    return 'assets/common/images/logo_text.svg';
  }

  shouldFullscreen(): Observable<boolean> {
    return this.fullScreenObserver$.asObservable();
  }

  currentPathChanges(): Observable<Path> {
    return this.currentPathObserver$.asObservable();
  }

  navigate(path: Path, routeParam?: string | number, queryParams?: Params): void {
    this.router
      .navigate(routeParam ? [path, routeParam] : [path], {
        queryParams: queryParams
      })
      .catch((error) => {
        this.logService.error('Error while navigating: ' + error);
        if (path !== Path.DEFAULT) {
          this.navigate(Path.PRODUCTS);
        }
      });
  }

  navigateToNewTab(path: Path, routeParam?: string | number, queryParams?: Params): void {
    const url: UrlTree = this.router.createUrlTree(routeParam ? [path, routeParam] : [path], {
        queryParams: queryParams
      });

    window.open(url.toString(), '_blank');
  }

  navigateToAdminProducerProfileView(producerId: number): void {
    this.navigate(Path.ADMIN_PRODUCER_PROFILE, producerId);
  }

  generateBreadcrumbLink(path: Path, queryParams?: Params): IBreadCrumbLink | null {
    const matchingRoute: Route | undefined = this.router.config.find(route => route.path === path);
    if (!matchingRoute || !matchingRoute.data) {
      return null;
    }

    const routeData: RouteData = matchingRoute.data as RouteData;
    if (!routeData.breadcrumbLinkText) {
      return null;
    }

    const hoverTitleSnippet: string = routeData.breadcrumbHoverTitle ?? routeData.breadcrumbLinkText;
    return {
      text: this.localisationService.loc(routeData.breadcrumbLinkText),
      link: {
        routerLink: `/${path}`,
        queryParams: queryParams,
        title: this.localisationService.loc(hoverTitleSnippet),
      }
    };
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url
  }

  getRedirectUrl(): string {
    return this.redirectUrl
  }

  override getCurrentPath(): Path {
    return this.activeUrl;
  }

  private handleNavigationEnd(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(this.getObservableRouteData.bind(this)),
    ).subscribe((routeData: RouteData) => this.handleRouteData(routeData));
  }

  private getObservableRouteData(): Observable<RouteData> | Observable<never> {
    const observableRouteData: Observable<RouteData> | undefined = this.router.routerState.root?.children[0]?.data as Observable<RouteData>;
    return observableRouteData ? observableRouteData : EMPTY;
  }

  private handleRouteData(routeData: RouteData): void {
    this.emitCurrentPathData(this.router.url);
    this.fullScreenObserver$.next(routeData['fullScreen']);
    this.titleService.setTitle(this.localisationService.loc(routeData['title']));
  }

  private emitCurrentPathData(url: string): void {
    this.activeUrl = this.getPathFromUrl(url);
    this.currentPathObserver$.next(this.activeUrl);
  }

  private getPathFromUrl(url: string): Path {
    const basePath: string = this.getPathValue(url);
    const foundKey: string | undefined = findKey(Path, (value) => value === basePath);
    return foundKey ? Path[foundKey as keyof typeof Path] : Path.DEFAULT;
  }

  private getPathValue(url: string): string {
    const trimmedUrl: string = url.startsWith('/') ? url.substring(1) : url;
    const segments: string[] = trimmedUrl.split('/');
    const lastSegmentIsNumber: boolean = !isNaN(Number(segments[segments.length - 1]));
    if (lastSegmentIsNumber) {
      segments.pop();
    }
    return segments.join('/').split('?')[0]
  }
}
