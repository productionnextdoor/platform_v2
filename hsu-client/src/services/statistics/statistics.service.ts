import { Injectable } from '@angular/core';
import { AppLocalizationService } from '../localization/app-localization.service';
import {
  IStatisticsDownload,
  IStatisticsLocalisationsSharedLocalisations
} from './statistics.shared';
import { IPmStatisticsCardLocalisations, ITab } from 'hsu-library';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  map,
  Observable
} from 'rxjs';
import { StatisticsServiceProxy } from '../../shared/service-proxies/service-proxies';
import { AppConsts } from 'src/shared/AppConsts';
import { IStatisticsService } from './istatistics.service';
import { DateTime } from 'luxon';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class StatisticsService extends IStatisticsService {

  constructor(
    private readonly localizationService: AppLocalizationService,
    private readonly http: HttpClient,
    private readonly statisticsService: StatisticsServiceProxy
  ) {
    super();
  }

  getFile(statisticData: IStatisticsDownload) {

    const dateFrom: DateTime = DateTime.fromFormat(statisticData.filter.dateFrom, AppConsts.DateFormatString)
    const dateTo: DateTime = DateTime.fromFormat(statisticData.filter.dateTo, AppConsts.DateFormatString)

    this.statisticsService.getStatistics(
      statisticData.type,
      statisticData.filter.filter,
      dateFrom.isValid ? dateFrom : undefined,
      dateTo.isValid ? dateTo : undefined
    )
      .pipe(
        switchMap((result) => {
          const url: string = `${AppConsts.remoteServiceBaseUrl}/File/DownloadTempFile?fileType=${result.fileType}
                                &fileToken=${result.fileToken}&fileName=${result.fileName}`;

          return this.sendGetRequest(url, result.fileType ?? '').pipe(
            map((archive) => this.processDownload(archive, result.fileName))
          );
        })
      )
      .subscribe();
  }

  public getStatisticsLocalisations(): IStatisticsLocalisationsSharedLocalisations {
    return {
      headerTitle: this.localizationService.loc('Statistics.HeaderTitle'),
      producerRequestLocalisations: this.getStatisticsCardLocalisations(
        'Statistics.Cards.ProducerRequest.Title',
        'Statistics.Cards.ProducerRequest.FilterInput.Label',
        'Statistics.Cards.ProducerRequest.FilterInput.Placeholder'
      ),
      productStepsLocalisations: this.getStatisticsCardLocalisations(
        'Statistics.Cards.ProductSteps.Title',
        'Statistics.Cards.ProductSteps.FilterInput.Label',
        'Statistics.Cards.ProductSteps.FilterInput.Placeholder'
      ),
      productValueChainsLocalisations: this.getStatisticsCardLocalisations(
        'Statistics.Cards.ProductValueChains.Title',
        'Statistics.Cards.ProductValueChains.FilterInput.Label',
        'Statistics.Cards.ProductValueChains.FilterInput.Placeholder'
      ),
    };
  }

  private getStatisticsCardLocalisations(
    titleKey: string,
    filterInputLabelKey: string,
    filterInputPlaceholderKey: string
  ): IPmStatisticsCardLocalisations {
    return {
      title: this.localizationService.loc(titleKey),
      filterInput: {
        label: this.localizationService.loc(filterInputLabelKey),
        placeholder: this.localizationService.loc(filterInputPlaceholderKey),
      },
      dateFrom: {
        label: this.localizationService.loc('Statistics.Cards.DateFrom.Label'),
        placeholder: this.localizationService.loc('Statistics.Cards.DateFrom.Placeholder'),
      },
      dateTo: {
        label: this.localizationService.loc('Statistics.Cards.DateTo.Label'),
        placeholder: this.localizationService.loc('Statistics.Cards.DateTo.Placeholder'),
      },
      buttonLabel: this.localizationService.loc('Statistics.Cards.ButtonLabel'),
    };
  }

  public getTabs(): ITab<number>[] {
    return [
      {
        text: this.localizationService.loc('Statistics.Tabs.Products'),
        value: 0,
        active: true,
      },
      {
        text: this.localizationService.loc('Statistics.Tabs.Producers'),
        value: 1,
        active: false,
      },
    ]
  }

  private sendGetRequest(url: string, fileType: string): Observable<Blob> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': fileType
    });

    return this.http.get(url, {
      headers, responseType: 'blob'
    })
  }

  private processDownload(file: Blob, fileName: string) {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
  }
}
