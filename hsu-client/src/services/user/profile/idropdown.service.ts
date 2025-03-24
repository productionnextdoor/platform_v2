import {
  EUserStatus,
  IProducerTradeType,
  PmDropdownOption
} from 'hsu-library';

export abstract class IDropdownService {
  abstract getRatingDropdownOptions(maxRating: number): PmDropdownOption<number>[];

  abstract getStateDropdownOptions(): PmDropdownOption<EUserStatus>[];

  abstract getTradeTypeDropdownOptions(producerTradeTypes: IProducerTradeType[]): PmDropdownOption<number>[];
}
