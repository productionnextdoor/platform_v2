import {
  Injector,
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  AppConsts
} from '../AppConsts';
import {
  LocalizationService
} from 'abp-ng2-module';

type ArgType = (string | number | boolean);

@Pipe({
  name: 'localize',
})
//Copied from the client
export class LocalizePipe implements PipeTransform {
  localizationSourceName: string = AppConsts.localization.defaultLocalizationSourceName;

  localization: LocalizationService;

  constructor(injector: Injector) {
    this.localization = injector.get(LocalizationService);
  }

  loc(key: string, ...args: ArgType[]): string {
    return this.locs(this.localizationSourceName, key, ...args);
  }

  locs(sourceName: string, key: string, ...args: ArgType[]): string {
    let localizedText: string = this.localization.localize(key, sourceName);

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    return abp.utils.formatString.apply(this, [localizedText, ...this.flattenDeep(args)]);
  }

  transform(key: string, ...args: ArgType[]): string {
    return this.loc(key, ...args);
  }

  flattenDeep(array: ArgType[]): ArgType[] {
    return array.reduce(
      (acc: ArgType[], val: ArgType) => (Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val)),
      []
    );
  }
}
