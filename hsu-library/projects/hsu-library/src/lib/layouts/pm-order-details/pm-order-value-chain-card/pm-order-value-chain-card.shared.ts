import { TConstEnum } from '../../../utils/constants/types';

export const EValueChainStatus: TConstEnum = {
  Selected: 'selected',
  Rejected: 'rejected',
  Commissioned: 'commissioned',
  InProgress: 'inProgress',
  Completed: 'completed',
  Canceled: 'canceled',
} as const

export const EValueChainCommissionMode: TConstEnum = {
  Manual: 'manual',
  Automatic: 'automatic',
} as const

export type ValueChainStatusValues = typeof EValueChainStatus[keyof typeof EValueChainStatus];
export type ValueChainCommissionModeValues = typeof EValueChainCommissionMode[keyof typeof EValueChainCommissionMode];

export interface IValueChainStatusLocalisation {
  rejected: string,
  commissioned: string,
  inProgress: string,
  completed: string,
  canceled: string
}

export interface IValueChainCardLocalisations {
  requestValueChain: string,
  description: string,
  requestDate: string,
  commissionBtn: string
  status: IValueChainStatusLocalisation
}

export const valueChainCardLocalisation: IValueChainCardLocalisations = {
  description: '',
  requestDate: '',
  requestValueChain: '',
  commissionBtn: '',
  status: {
    rejected: '',
    commissioned: '',
    inProgress: '',
    completed: '',
    canceled: ''
  },
}
