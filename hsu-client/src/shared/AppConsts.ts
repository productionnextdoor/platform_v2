import { IImprintLink } from 'hsu-library';
import { Path } from '../app/app-routing.module';

export interface LocaleMap {
  from: string,
  to: string
}

export class AppConsts {

  static remoteServiceBaseUrl: string;
  static appBaseUrl: string;
  static appBaseHref: string;

  static localeMappings: LocaleMap[] = [];

  static readonly localization = {
    defaultLocalizationSourceName: 'HsuClientLocalization',
    defaultLanguage: 'de'
  };

  static readonly authorization = {
    encryptedAuthTokenName: 'enc_auth_token',
    twoFactorRememberClientToken: 'TwoFactorRememberClientToken'
  };

  static readonly DateFormatString: string = 'd.M.yyyy'

  static readonly EndOfTheDay = {
    hour: 23, minute: 59, second: 59
  }

  static getImprintLinks(titleTerms: string, titlePrivacy: string): IImprintLink<Path>[] {
    return [
      {
        linkId: 1,
        title: titleTerms,
        path: Path.TERMS_AND_CONDITIONS,
      },
      {
        linkId: 2,
        title: titlePrivacy,
        path: Path.PRIVACY_POLICY,
      }
    ];
  }
}
