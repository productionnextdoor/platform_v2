import { IBreadCrumbLink, IBreadcrumbs } from '../../../lib/layouts/pm-header/pm-header.shared';

interface IContentSidebarData {
  ngContent: string;
  breadcrumbs: IBreadcrumbs;
}

const breadcrumbLink: IBreadCrumbLink = {
  text: 'Produktübersicht',
  link: {
    routerLink: '/example-url-to-products',
    title: 'Zur Produktübersicht'
  }
}

const breadcrumbs: IBreadcrumbs = {
  breadcrumbLinks: [breadcrumbLink],
  lastBreadcrumb: 'Kommode Alpha'
}

export const ContentSidebarData: IContentSidebarData = {
  breadcrumbs: breadcrumbs,
  ngContent:
    '<pm-product-details-sidebar detailsSidebar' +
    '  [productDataSidebar]="[{sectionTitle: \'Allgemeine Angaben\', content: \'\', groups: [{groupTitle: \'\', ' +
    '  properties: [{key: \'Entwickler:in\', value: \'Sven Moench\'}, {key: \'Name des Produkts\', value: \'Kommode Alpha\'}, ' +
    '  {key: \'Produktnummer\', value: \'123456\'}, {key: \'Erstelldatum\', value: \'07.08.2023\'}, {key: \'Größe im Produktstandard (H,  B,  T)\', value: \'120 cm,  100 cm,  80 cm\'}]}]}, ' +
    '  {sectionTitle: \'Materialgruppen im Produktstandard\', content: \'\', groups: [{groupTitle: \'Holz\', properties: [{key: \'Material\', value: \'Birke Multiplex\'}, ' +
    '  {key: \'Finaler Zustand\', value: \'Montiertes Gestell\'}, {key: \'Oberflächenbeschaffenheit\', value: \'Oberfläche 01\'}]}, {groupTitle: \'Glas\', properties: [{key: \'Material\', value: \'Einscheiben-Sicherheits-Glas\'}, ' +
    '  {key: \'Finaler Zustand\', value: \'Fertige Glasplatte\'}, {key: \'Oberflächenbeschaffenheit\', value: \'Klar\'}]}]}, {sectionTitle: \'Produktvarianten\', content: \'\', groups: [{groupTitle: \'Abweichende Größen (Min. - Max.)\', ' +
    '  properties: [{key: \'Größe (H,  B,  T)\', value: \'60 cm,  80 cm,  80 cm\'}, {key: \'Größe (H,  B,  T)\', value: \'160 cm,  120 cm,  80 cm\'}, {key: \'Größe (H,  B,  T)\', value: \'180 cm,  120 cm,  80 cm\'}]}, ' +
    '  {groupTitle: \'Abweichende Materialien (Holz)\', properties: [{key: \'Material (Holz)\', value: \'Birke Multiplex,  FSC\'}, {key: \'Material (Holz)\', value: \'Buche Leimholz\'}]}]}, {sectionTitle: \'Kurzbeschreibung\', ' +
    '  content: \'Lorem ipsum dolor sit amet,  consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.' +
    '  Lorem ipsum dolor sit amet,  consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\', groups: []}]"' +
    '  [sharePointLink]="\'linkzumsharepoint.com\'" ' +
    '  [uploadCategories]="{ProductDescription: \'Produktbeschreibung\', ProductPicture: \'Produktbilder\', ' +
    '  ModelsAndDrawings: \'Modelle und Zeichnungen\', TechnicalDetails: \'Technische Details\', ManufacturingHints: \'Herstellungshinweise\', ' +
    '  InstallationAndUsageInstructions: \'(Intallations- und Nutzungs) Anweisungen\', Miscellaneous: \'Begleitdokumente und Sonstiges\'}"' +
    '  [fileData]="[{fileId: 1, fileName: \'productDescription.pdf\', categoryName: \'ProductDescription\'}, ' +
    '   {fileId: 2, fileName: \'productPicture.jpg\', categoryName: \'ProductPicture\'}, {fileId: 3, fileName: \'productPicture.jpg\', categoryName: \'ProductPicture\'}, ' +
    '   {fileId: 4, fileName: \'modelsAndDrawings.pdf\', categoryName: \'ModelsAndDrawings\'}, {fileId: 5, fileName: \'technicalDetails.cad\', categoryName: \'TechnicalDetails\'}, ' +
    '   {fileId: 6, fileName: \'manufacturingHints.pdf\', categoryName: \'ManufacturingHints\'}, {fileId: 7, fileName: \'installationAndUsageInstructions.exl\', categoryName: \'InstallationAndUsageInstructions\'}, ' +
    '   {fileId: 8, fileName: \'miscellaneousDocuments.pdf\', categoryName: \'Miscellaneous\'}]"' +
    '  [productImagePath]="\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAwIiBoZWlnaHQ9IjExOTYiIHZpZXdCb3g9IjAgMCAxODAwIDExOTYiPgogIDxnIGlkPSJHcnVwcGVfMzE4MDIiIGRhdGEtbmFtZT0iR3J1cHBlIDMxODAyIiB0cm' +
    '  Fuc2Zvcm09InRyYW5zbGF0ZSgtMTg1MDggMjA3ODQpIj4KICAgIDxyZWN0IGlkPSJSZWNodGVja18xMzY0MSIgZGF0YS1uYW1lPSJSZWNodGVjayAxMzY0MSIgd2lkdGg9IjE4MDAiIGhlaWdodD0iMTE5NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg1MDggLTIwNzg0KSIgZmlsbD0iI2Y4ZjhmOCIvPgogICAgPHBh' +
    '  dGggaWQ9ImltYWdlX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejQ4XzJfIiBkYXRhLW5hbWU9ImltYWdlX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejQ4ICgyKSIgZD0iTTEyMy4yMjItMTQ1LjcwN0gxODI5Ljk3NkwxMzE2LjktODI5LjgwNSw4NTYuMTg0LTIzMi45NjRsLTMyNC42LTQ0My4yNTNaIiB0cmFuc2Zvcm09' +
    '  InRyYW5zbGF0ZSgxODQzMS4yMTcgLTE5NDg4Ljg0NikiIGZpbGw9IiNkZGRjZGMiLz4KICA8L2c+Cjwvc3ZnPgo=\'"' +
    '  [productImagePathFull]="\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAwIiBoZWlnaHQ9IjExOTYiIHZpZXdCb3g9IjAgMCAxODAwIDExOTYiPgogIDxnIGlkPSJHcnVwcGVfMzE4MDIiIGRhdGEtbmFtZT0iR3J1' +
    '  cHBlIDMxODAyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg1MDggMjA3ODQpIj4KICAgIDxyZWN0IGlkPSJSZWNodGVja18xMzY0MSIgZGF0YS1uYW1lPSJSZWNodGVjayAxMzY0MSIgd2lkdGg9IjE4MDAiIGhlaWdodD0iMTE5NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg1MDggLTIwNzg0KSIg' +
    '  ZmlsbD0iI2Y4ZjhmOCIvPgogICAgPHBhdGggaWQ9ImltYWdlX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejQ4XzJfIiBkYXRhLW5hbWU9ImltYWdlX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejQ4ICgyKSIgZD0iTTEyMy4yMjItMTQ1LjcwN0gxODI5Ljk3NkwxMzE2LjktODI5LjgwNSw4NTYuMTg0' +
    '  LTIzMi45NjRsLTMyNC42LTQ0My4yNTNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODQzMS4yMTcgLTE5NDg4Ljg0NikiIGZpbGw9IiNkZGRjZGMiLz4KICA8L2c+Cjwvc3ZnPgo=\'"' +
    '  [localisations]="{sidebarTitle: \'Produktdetails\', fileSectionTitle: \'Dateien\', sharepointLinkLabel: \'Link zum SharePoint\'}"' +
    '  (onDownload)="onDownload($event)"' +
    '  (sidebarCollapsedChange)="onSidebarCollapsed($event)"' +
    '  (onClickLink)="onClickLink($event)"' +
    '  (onProductEditClicked)="onProductEditClicked($event)"' +
    '></pm-product-details-sidebar>'
}
