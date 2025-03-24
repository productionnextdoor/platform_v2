import { Injectable } from '@angular/core';
import {
  map, Observable, of
} from 'rxjs';
import {
  FullProducerProfileInput,
  FullProducerProfileOutput,
  IProducerRatingDto,
  ITradeTypeDto,
  ProducerProfile,
  ProducerProfileForEditOutput,
  ProducerProfileOutput,
  ProducerRatingDto,
  TradeTypeDto,
  UserExtendedServiceProxy,
  UserStatus,
} from '../../../shared/service-proxies/service-proxies';
import {
  IProducer,
  IProducerRating,
  IProducerTradeType,
  EUserStatus
} from 'hsu-library';
import { IProducerService } from './iproducer.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProducerService extends IProducerService {
  constructor(private readonly userServiceProxy: UserExtendedServiceProxy,
              private readonly localizationService: AppLocalizationService) {
    super();
  }

  getCurrentProducer(): Observable<IProducer> {
    return this.userServiceProxy.getCurrentProducerProfile().pipe(
      map(this.mapFromProducerProfileOutput.bind(this))
    );
  }

  getProducerById(producerId: number): Observable<IProducer> {
    return this.userServiceProxy.getProducerProfile(producerId).pipe(
      map(this.mapFromProducerProfileForEditOutput.bind(this))
    );
  }

  updateCurrentProducer(producer: IProducer): Observable<IProducer> {
    return of(producer).pipe(
      map((input: IProducer) => this.mapFromProducer(input)),
      switchMap((input: ProducerProfile) => this.userServiceProxy.updateCurrentProducerProfile(input)),
      map((input: ProducerProfileOutput) => this.mapFromProducerProfileOutput(input))
    );
  }

  updateProducer(producer: IProducer): Observable<IProducer> {
    return of(producer).pipe(
      map((input: IProducer) => this.mapToFullProducerProfileInput(input)),
      switchMap((input: FullProducerProfileInput) => this.userServiceProxy.updateProducerProfile(input)),
      map((input: ProducerProfileForEditOutput) => this.mapFromProducerProfileForEditOutput(input)));
  }

  private mapFromProducerProfileOutput(producerProfile: ProducerProfileOutput): IProducer {
    const ratings: IProducerRating[] = producerProfile.producerRatings?.map(
      (ratingDto: IProducerRatingDto) => {
        return {
          identifier: ratingDto.ratingId,
          rating: ratingDto.rating,
          type: this.localizationService.getLocalizedRatingType(ratingDto.ratingType) ?? '',
        };
      }) ?? [];

    const tradeType: IProducerTradeType | undefined = producerProfile.trade ? {
      key: producerProfile.trade.tradeTypeId,
      value: producerProfile.trade.tradeTypeName ?? '',
    } : undefined;

    return {
      city: producerProfile.city,
      companyName: producerProfile.companyName,
      contactPersonFullName: producerProfile.contactPersonFullName,
      email: producerProfile.email,
      isActive: producerProfile.isActive,
      numberOfEmployees: (producerProfile.numberOfEmployees === 0) ? undefined : producerProfile.numberOfEmployees,
      phoneNumber: producerProfile.phoneNumber,
      rate: producerProfile.rate,
      street: producerProfile.street,
      trade: tradeType,
      zipCode: producerProfile.zipCode,
      producerRatings: ratings
    };
  }

  private mapFromProducerProfileForEditOutput(producerProfileForEditOutput: ProducerProfileForEditOutput): IProducer {
    const profile: FullProducerProfileOutput = producerProfileForEditOutput.producerProfile;
    const statusEnumMap: Map<UserStatus, EUserStatus> = this.initStatusEnumMap();
    return {
      alreadyProducedFurniture: profile.productsProduced,
      associatedProducts: profile.productsInvolved,
      city: profile.city,
      companyName: profile.companyName,
      contactPersonFullName: profile.contactPersonFullName,
      currentOrders: profile.currentOrders,
      email: profile.email,
      isActive: profile.isActive,
      note: profile.note,
      userId: profile.userId,
      rate: profile.rate,
      numberOfEmployees: (profile.numberOfEmployees === 0) ? undefined : profile.numberOfEmployees,
      phoneNumber: profile.phoneNumber,
      producerRatings: this.mapToIProducerRatings(profile.producerRatings),
      street: profile.street,
      trade: this.mapToIProducerTradeType(profile.trade),
      tradeTypes: this.mapToIProducerTradeTypes(producerProfileForEditOutput.tradeTypes ?? []),
      zipCode: profile.zipCode,
      status: statusEnumMap.get(profile.status)
    };
  }

  private mapToFullProducerProfileInput(producer: IProducer): FullProducerProfileInput {
    const {
      city = '',
      companyName = '',
      contactPersonFullName = '',
      email = '',
      isActive = false,
      numberOfEmployees = 0,
      phoneNumber = '',
      rate = 0,
      street = '',
      zipCode = '',
      trade: tradeValue,
      producerRatings: ratingsValue,
      note = undefined,
      userId = 0,
    } = producer;
    const trade: TradeTypeDto = tradeValue ? this.mapToTradeTypeDto(tradeValue) : new TradeTypeDto({
      tradeTypeId: 0, tradeTypeName: ''
    });

    const producerRatings: ProducerRatingDto[] = this.mapToProducerRatingDto(ratingsValue);
    const fullProfileInput: FullProducerProfileInput = new FullProducerProfileInput();
    fullProfileInput.trade = trade;
    fullProfileInput.numberOfEmployees = numberOfEmployees;
    fullProfileInput.rate = rate;
    fullProfileInput.producerRatings = producerRatings;
    fullProfileInput.companyName = companyName;
    fullProfileInput.note = note;
    fullProfileInput.userId = userId;
    fullProfileInput.isActive = isActive;
    fullProfileInput.contactPersonFullName = contactPersonFullName;
    fullProfileInput.street = street;
    fullProfileInput.zipCode = zipCode;
    fullProfileInput.city = city;
    fullProfileInput.email = email;
    fullProfileInput.phoneNumber = phoneNumber;
    return fullProfileInput;
  }

  private mapFromProducer(producer: IProducer): ProducerProfile {
    const {
      city = '',
      companyName = '',
      contactPersonFullName = '',
      email = '',
      numberOfEmployees = 0,
      phoneNumber = '',
      rate = 0,
      street = '',
      zipCode = '',
    } = producer;
    return new ProducerProfile({
      city, companyName, contactPersonFullName, email, numberOfEmployees, phoneNumber, rate, street, zipCode,
    });
  }

  private mapToIProducerRatings(ratingsDto: IProducerRatingDto[] | undefined): IProducerRating[] {
    return (ratingsDto || []).map((rating: IProducerRatingDto) => ({
      identifier: rating.ratingId,
      rating: rating.rating,
      type: this.localizationService.getLocalizedRatingType(rating.ratingType) || ''
    }));
  }

  private mapToIProducerTradeTypes(tradeTypesDto: TradeTypeDto[] | undefined): IProducerTradeType[] {
    return (tradeTypesDto || []).map((tradeTypeDto: ITradeTypeDto) => ({
      key: tradeTypeDto.tradeTypeId,
      value: this.localizationService.getLocalizedTradeTypeName(tradeTypeDto.tradeTypeName) ?? ''
    }));
  }

  private mapToIProducerTradeType(tradeTypeDto: ITradeTypeDto): IProducerTradeType {
    return {
      key: tradeTypeDto.tradeTypeId,
      value: this.localizationService.getLocalizedTradeTypeName(tradeTypeDto.tradeTypeName) ?? ''
    };
  }

  private mapToTradeTypeDto(tradeType: IProducerTradeType): TradeTypeDto {
    return new TradeTypeDto({
      tradeTypeId: tradeType.key,
      tradeTypeName: tradeType.value + '',
    });
  }

  private mapToProducerRatingDto(ratings: IProducerRating[] | undefined): ProducerRatingDto[] {
    return (ratings || []).map((iProducerRating: IProducerRating) => {
      return new ProducerRatingDto({
        ratingId: iProducerRating.identifier,
        rating: iProducerRating.rating,
        ratingType: iProducerRating.type || '',
      })
    });
  }

  private initStatusEnumMap(): Map<UserStatus, EUserStatus> {
    return new Map<UserStatus, EUserStatus>([
      [UserStatus.Active, EUserStatus.Active],
      [UserStatus.InActive, EUserStatus.InActive],
      [UserStatus.Invited, EUserStatus.Invited],
    ]);
  }
}
