import { Params } from '@angular/router';

export interface IBreadCrumbLink {
  text: string;
  link: {
    routerLink: string;
    title: string;
    queryParams?: Params;
  }
}

export interface IBreadcrumbs {
  breadcrumbLinks?: IBreadCrumbLink[];
  lastBreadcrumb: string;
}

export const defaultBreadcrumbs: IBreadcrumbs = {
  lastBreadcrumb: ''
};
