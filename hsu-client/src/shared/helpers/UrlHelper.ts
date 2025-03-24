export interface IQueryParameters {
  [key: string]: string;
}

export class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  static readonly initialUrl = location.href;


  static getQueryParameters(): IQueryParameters {
    return UrlHelper.getQueryParametersUsingParameters(document.location.search);
  }

  static getQueryParametersUsingParameters(search: string): IQueryParameters {
    const result: IQueryParameters = {} as IQueryParameters;
    search
      .replace(/(^\?)/, '')
      .split('&')
      .forEach((parameter: string) => {
        const parts: string[] = parameter.split('=');
        result[parts[0]] = parts[1];
      });
    return result;
  }
}
