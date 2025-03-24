import { IPmWizardLocalisations } from 'hsu-library';
import { WizardStepType } from '../../shared/service-proxies/service-proxies';

export interface IProductCreateOrEditLocalisation {
  draft: string;
  wizard: IPmWizardLocalisations;
}
export interface IStep {
  wizardStepType: WizardStepType,
  description: string;
}
