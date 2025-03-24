export type Margin = number | 'auto';

export interface IComponentMargin {
  top: Margin;
  bottom: Margin;
  left: Margin;
  right: Margin;
}

/**
 * @description This class is used to set the margin of an element without having to set all the values.
 * @example
 * // This will set the top, right, bottom and left margin to 20px
 * const margin = new CMargin(20);
 * @example
 * // This will set the top and bottom margin to 20px and the right and left margin to 10px
 * const margin = new CMargin(20, 10);
 * @returns {IComponentMargin} An object containing the margin values
 */
export class PmComponentMargin implements IComponentMargin {
  public right: Margin
  public bottom: Margin
  public left: Margin
  constructor(
    public top: Margin = 0,
    right?: Margin,
    bottom?: Margin,
    left?: Margin
  ) {
    this.right = right ?? top;
    this.bottom = bottom ?? top;
    this.left = left ?? this.right;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

// default margins
export interface IMargin {
  XLarge: number,
  Large: number,
  Medium: number,
  Small: number,
  XSmall: number,
  XXSmall: number
}

export const DefaultMargins: IMargin = {
  XLarge: 40,
  Large: 32,
  Medium: 24,
  Small: 16,
  XSmall: 8,
  XXSmall: 4,
};
