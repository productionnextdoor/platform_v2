export class PmCssUtils {
  public static getCssVar(name: string, element: HTMLElement = document.documentElement): string {
    return getComputedStyle(element).getPropertyValue(name);
  }
}
