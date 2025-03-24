import {
  LocalizationService
} from 'abp-ng2-module';
import {
  Injectable
} from '@angular/core';
import {
  AppConsts
} from '../../shared/AppConsts';

type ArgType = (string | number | boolean);

@Injectable()
export class AppLocalizationService extends LocalizationService {
  protected snippetGroups = {
    materialGroup: 'MaterialGroup',
    surfaceFinish: 'SurfaceFinish',
    workType: 'UserProfile.WorkType',
    ratingType: 'UserProfile.ProducerRatings',
  }

  loc(key: string, ...args: ArgType[]): string {
    return this.locs(AppConsts.localization.defaultLocalizationSourceName, key, ...args);
  }

  locs(sourceName: string, key: string, ...args: ArgType[]): string {
    let localizedText: string = this.localize(key, sourceName);

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }
    return abp.utils.formatString.apply(this, [localizedText, ...args]);
  }

  getLocalizedMaterialGroupName(materialGroupName?: string): string | undefined {
    return materialGroupName && this.loc(`${this.snippetGroups.materialGroup}.${materialGroupName}`);
  }

  getLocalizedSurfaceFinish(surfaceFinish?: string): string | undefined {
    return surfaceFinish && this.loc(`${this.snippetGroups.surfaceFinish}.${surfaceFinish}`);
  }

  getLocalizedTradeTypeName(tradeType?: string): string | undefined {
    return tradeType && this.loc(`${this.snippetGroups.workType}.${tradeType}`);
  }

  getLocalizedRatingType(rating?: string): string | undefined {
    return rating && this.loc(`${this.snippetGroups.ratingType}.${rating}`);
  }
}
