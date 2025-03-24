import {
  Observable
} from 'rxjs';
import {
  Path
} from '../../app/app-routing.module';
import { Params } from '@angular/router';
import { IBreadCrumbLink } from 'hsu-library';

export abstract class INavigationService {
  abstract getLogoTextPath(): string;

  abstract getLogoPath(): string;

  abstract shouldFullscreen(): Observable<boolean>;

  abstract currentPathChanges(): Observable<Path>;

  abstract navigate(path: Path, routeParam?: string | number, queryParams?: Params): void;

  abstract navigateToNewTab(path: Path, routeParam?: string | number, queryParams?: Params): void;

  abstract navigateToAdminProducerProfileView(producerId: number): void;

  abstract getCurrentPath(): Path;

  abstract setRedirectUrl(url: string): void;

  abstract getRedirectUrl(): string;

  abstract generateBreadcrumbLink(path: Path, queryParams?: Params): IBreadCrumbLink | null;
}
