export interface IWorkstepDataLocalisations {
  productDimensionLabel: string;
  workstepTimeData: IWorkstepTimeDataLocalisations;
  workstepCostsData: IWorkstepCostsDataLocalisations;
}

export interface IWorkstepTimeDataLocalisations {
  title: string;
  description: string;
  hourlyInputUnit: string;
  weeklyInputUnit: string;
  processingTimeInputLabel: string;
  workingTimeInputLabel: string;
  supplyOtherCraftsInWeeksInputLabel: string;
}

export interface IWorkstepCostsDataLocalisations {
  title: string;
  description: string;
  inputUnit: string;
  transportRateInputLabel: string;
  additionalMaterialsInputLabel: string;
  materialCostsInputLabel: string;
  checkboxLabel: string;
}

export const WorkstepDataLocalisations: IWorkstepDataLocalisations = {
  productDimensionLabel: '',
  workstepTimeData: {
    title: '',
    description: '',
    hourlyInputUnit: '',
    weeklyInputUnit: '',
    processingTimeInputLabel: '',
    workingTimeInputLabel: '',
    supplyOtherCraftsInWeeksInputLabel: '',
  },
  workstepCostsData: {
    title: '',
    description: '',
    inputUnit: '',
    transportRateInputLabel: '',
    additionalMaterialsInputLabel: '',
    materialCostsInputLabel: '',
    checkboxLabel: ''
  }
}
