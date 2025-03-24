import { Component, OnInit } from '@angular/core';
import {
  defaultBreadcrumbs,
  DefaultMargins,
  IBreadcrumbs,
  ITab
} from 'hsu-library';
import {
  StatisticsDataType,
} from '../../shared/service-proxies/service-proxies';
import {
  defaultStatisticsLocalisations,
  IStatisticsDownload,
  IStatisticsLocalisationsSharedLocalisations
} from '../../services/statistics/statistics.shared';
import { IStatisticsService } from '../../services/statistics/istatistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;
  protected readonly StatisticsDataType = StatisticsDataType;
  protected localisations: IStatisticsLocalisationsSharedLocalisations = defaultStatisticsLocalisations

  tabCardTabs: ITab<number>[] = [];
  activeTab: number = 0;
  breadcrumbs: IBreadcrumbs =  defaultBreadcrumbs

  constructor(
    private statisticsService: IStatisticsService
  ) {
  }

  ngOnInit(): void {
    this.localisations = this.statisticsService.getStatisticsLocalisations();
    this.tabCardTabs= this.statisticsService.getTabs();
    this.getBreadcrumbs();
  }

  tabChange(activeTab: number) {
    this.activeTab = activeTab;
  }


  downloadFile(statisticData: IStatisticsDownload) {
    this.statisticsService.getFile(statisticData)
  }

  getBreadcrumbs(): void {
    this.breadcrumbs = {
      lastBreadcrumb: this.localisations.headerTitle
    };
  }

}


