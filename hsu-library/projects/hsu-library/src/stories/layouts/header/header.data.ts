import {
  ButtonType
} from '../../../lib/components/pm-button/pm-button.component';
import {
  Icon
} from '../../../lib/components/pm-icon/pm-icon.shared';
import { IBreadCrumbLink, IBreadcrumbs } from '../../../lib/layouts/pm-header/pm-header.shared';

interface IHeaderData {
  breadcrumbs: IBreadcrumbs,
  ngContent: string,
}

const exampleBreadcrumbLink: IBreadCrumbLink = {
  text: 'Produktübersicht',
  link: {
    routerLink: '/example-link',
    title: 'Zur Produktübersicht'
  }
}

export const HeaderData: IHeaderData = {
  breadcrumbs: {
    breadcrumbLinks: [exampleBreadcrumbLink],
    lastBreadcrumb: 'Kommode Alpha'
  },
  ngContent: `<pm-button [type]="'${ButtonType.PRIMARY}'" [icon]="'${Icon.ADD}'" [label]="'Label'"></pm-button>`
}
