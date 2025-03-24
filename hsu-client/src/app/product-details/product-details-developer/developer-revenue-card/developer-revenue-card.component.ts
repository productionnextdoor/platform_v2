import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  IDeveloperRevenueCardLocalisations,
  IDeveloperRevenueInfo
} from 'hsu-library';
import { AppLocalizationService } from '../../../../services/localization/app-localization.service';
import { AppConsts } from '../../../../shared/AppConsts';
import { IDeveloperApiService } from '../../../../services/developer/ideveloper-api.service';

@Component({
  selector: 'developer-revenue-card',
  templateUrl: './developer-revenue-card.component.html'
})
export class DeveloperRevenueCardComponent implements OnInit {

  @Input()
  productId: number = 0;

  protected developerRevenueCardLocalisations: IDeveloperRevenueCardLocalisations;

  protected developerRevenueInfo: IDeveloperRevenueInfo = {
    totalOrders: 0,
    priceRange: '',
    royaltyRate: 0,
    totalRevenue: 0
  };


  constructor(
    localizationService: AppLocalizationService,
    private readonly developerApiService: IDeveloperApiService
  ) {
    this.developerRevenueCardLocalisations = {
      mainTitle: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.Title'),
      subTitle: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.SubTitle'),
      totalOrders: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.TotalOrders'),
      priceRange: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.PriceRange'),
      royaltyRate: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.RoyaltyRate'),
      totalRevenue: localizationService.loc('ProductDetailsDeveloper.RevenueInfo.TotalRevenue'),
    }
  }

  ngOnInit(): void {
    if(!AppConsts.IsOffer){
      this.getDeveloperRevenueInfo();
    }
  }

  getDeveloperRevenueInfo(): void {
    this.developerApiService.getDeveloperRevenueInfo(this.productId)
      .subscribe((revenueData: IDeveloperRevenueInfo) => {
        this.developerRevenueInfo = revenueData;
      });
  }
}
