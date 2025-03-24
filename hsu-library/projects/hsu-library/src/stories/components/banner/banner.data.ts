import { BannerType } from '../../../lib/components/pm-banner/pm-banner.shared';

export interface BannerDataType {
  bannerText: string,
  bannerType: BannerType
}

export const bannerData: BannerDataType = {
  bannerText: 'This is an info message',
  bannerType: BannerType.ATTENTION
}
