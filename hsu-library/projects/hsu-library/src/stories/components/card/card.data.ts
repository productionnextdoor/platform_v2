export interface CardDataType {
  hasHeader: boolean;
  title: string;
  closable: boolean;
  collapsible: boolean;
  collapsed: boolean;
  disabled: boolean;
  noShadow: boolean;
  ngContent: string;
}

export const cardData: CardDataType = {
  hasHeader: true,
  title: 'Wertkettenplanung',
  closable: false,
  collapsible: false,
  collapsed: false,
  disabled: false,
  noShadow: false,
  ngContent: 'Lorem ipsum dolor sit amet.',
}
