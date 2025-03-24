import { ICardSectionData } from '../../shared/info-card-section-data.shared';

export interface IWorkStepData {
  producer: ICardSectionData;
  workTime: ICardSectionData;
  workStep: ICardSectionData;
  calculation: ICardSectionData;
}

export const defaultWorkStepData: IWorkStepData = {
  producer: {
    title: '',
    properties: []
  },
  workTime: {
    title: '',
    properties: []
  },
  workStep: {
    title: '',
    properties: []
  },
  calculation: {
    title: '',
    properties: []
  }
}

export interface IWorkStepPopupLocalisations {
  context: string;
  title: string;
  buttonLabel: string;
}

export const workStepPopupLocalisations: IWorkStepPopupLocalisations = {
  context: '',
  title: '',
  buttonLabel: ''
}
