export const DEFAULT_ITEMS_PER_PAGE: number = 10;
export const DEFAULT_PAGES_SHOWN: number = 3;

export interface IPager {
  CurrentPage: number;
  MaxResultCount: number;
  SkipCount: number;
}

export const Pager: IPager = {
  CurrentPage: 1,
  MaxResultCount: DEFAULT_ITEMS_PER_PAGE,
  SkipCount: 0
}
