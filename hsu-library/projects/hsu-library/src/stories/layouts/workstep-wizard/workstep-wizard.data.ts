import {
  EWorkstepType,
  IStepMeasurementVariants,
  IWorkstepWizardLocalisations,
} from '../../../lib/layouts/pm-workstep-wizard/pm-workstep-wizard.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';

interface IWorkstepWizardData {
  localisations: IWorkstepWizardLocalisations;
  stepId: number,
  startStateName: string
  finalStateName: string
  productStepsData: IStepMeasurementVariants[]
  readonly: boolean
  assemblyOnly: boolean
  assemblyInvolved: boolean
}

export const WorkstepWizardData: IWorkstepWizardData = {
  localisations: {
    context: 'Arbeitsschritt:',
    steps: {
      default: 'Produktstandard',
      max: 'Max. Ausprägung',
      min: 'Min. Ausprägung',
    },
    wizard: {
      cancel: 'Abbrechen',
      draft: 'Angaben speichern',
      save: 'Arbeitsschritt speichern',
      prevStep: 'Zurück zu Schritt {step}',
      nextStep: 'Weiter zu Schritt {step}',
      cancelConfirmationTitle: 'Ohne „speichern“ schließen',
      cancelConfirmationDescription:
        'Klicke auf „Bestätigen“ wenn du das Fenster schließen möchtest, ohne deine zuletzt vorgenommenen Angaben zu ' +
        'speichern. Wenn du die Angaben speichern möchtest, klicke auf „Abbrechen“, um zurück zum Produktentwurf zu gelangen.',
      confirm: 'Bestätigen',
      saveAsAdmin: 'Speichern',
      confirmPopup: {
        title: 'Produkt einreichen',
        description: 'Wenn du auf “Produkt einreichen” klickst, wird der Entwurf an den zuständigen Administrator weitergeleitet.' +
          ' Danach hast du vorerst keine Möglichkeit mehr die Details des Produktes zu bearbeiten.' +
          ' Möchtest du das Produkt wirklich einreichen?',
        confirm: 'Produkt einreichen',
        cancel: 'Abbrechen'
      }
    },
    workstepData: {
      productDimensionLabel: 'Größe (H, B, T)',
      workstepTimeData: {
        title: '1. Angaben zur Arbeitszeit',
        description: 'Bitte gib an, wie viele Stunden du für die Bearbeitung dieses Schrittes benötigst, unter Berücksichtigung deiner aktuellen Auftragslage. Nenne auch den Zeitrahmen, in dem du diesen Arbeitsschritt abschließen kannst.',
        hourlyInputUnit: 'Stunden',
        weeklyInputUnit: 'Wochen',
        processingTimeInputLabel: 'Voraussichtliche Auftragsbearbeitungszeit in Wochen',
        workingTimeInputLabel: 'Arbeitszeit in Stunden',
        supplyOtherCraftsInWeeksInputLabel: 'Zulieferung der Produkte anderer Gewerke wird spätestens benötigt nach'
      },
      workstepCostsData: {
        title: '2. Angaben zu den Kosten',
        description: 'Füge die Materialkosten hinzu. Solltest du eine Variante nicht produzieren können, so aktiviere die entsprechende Checkbox ' +
          '(diese Möglichkeit besteht nur bei den Produktvarianten). Gib auch eine Pauschale für Transport und Montage an, um die Kosten für den Transport innerhalb Hamburgs oder die Montage zu berücksichtigen.',
        inputUnit: 'Euro (Netto)',
        transportRateInputLabel: 'Transport- & Montagepauschale',
        additionalMaterialsInputLabel: 'Kosten für Zusatzmaterialien (z. B. Beschläge, Folien, ….)',
        materialCostsInputLabel: 'Materialkosten',
        checkboxLabel: 'Diese Variante kann ich nicht produzieren'
      }
    },
    infoBanner: 'Deine Angaben aus dem Produktstandard werden hier automatisch übertragen.Falls sich für diese Produkt-Ausprägung Änderungen ergeben, trage diese bitte entsprechend ein. ' +
      'Bei den Angaben zu den Kosten ist es ausreichend, eine neue Angabe für das Standard Material einzutragen, weitere Materialvarianten werden dann prozentual angeglichen.',
    deleteBtn: 'Arbeitsschritt löschen',
    confirmDeletePopup: {
      title: 'Arbeitsschritt löschen',
      description: 'Bist du sicher, dass du diesen Arbeitsschritt löschen möchten?',
      confirm: 'Arbeitsschritt löschen',
      cancel: 'Abbrechen'
    }
  },
  stepId: 1,
  startStateName: 'Rohmaterial Holz',
  finalStateName: 'Zugeschnittene Platten',
  productStepsData: [
    {
      stepMeasurementVariantsId: 0,
      measurementId: 0,
      measurementsName: '180 cm, 120cm, 130cm',
      orderProcessingTime: 0,
      workHours: 0,
      supplyOtherCraftsInWeeks: 0,
      transportAndAssemblyCost: 0,
      additionalCosts: 0,
      measurementVariantType: EWorkstepType.DEFAULT,
      workPieceVariantsCost: [
        {
          workPieceVariantCostId: 0,
          workPieceId: 0,
          workPieceVariantId: 0,
          isStandard: true,
          materialCost: 0,
          canProduce: PmCheckboxState.DEFAULT,
          description: {
            material: 'Rohmaterial Holz',
            group: 'Material(Holz)',
          }
        },
        {
          workPieceVariantCostId: 0,
          workPieceId: 0,
          workPieceVariantId: 0,
          isStandard: false,
          materialCost: 0,
          canProduce: PmCheckboxState.DEFAULT,
          description: {
            material: 'Rohmaterial Holz',
            group: 'Material(Holz)',
          }
        }
      ]
    },
    {
      stepMeasurementVariantsId: 0,
      measurementId: 0,
      measurementsName: '280 cm, 220cm, 230cm',
      orderProcessingTime: 0,
      workHours: 0,
      transportAndAssemblyCost: 0,
      additionalCosts: 0,
      supplyOtherCraftsInWeeks: 0,
      measurementVariantType: EWorkstepType.MAX,
      workPieceVariantsCost: [
        {
          workPieceVariantCostId: 0,
          workPieceId: 0,
          workPieceVariantId: 0,
          isStandard: true,
          materialCost: 0,
          canProduce: PmCheckboxState.DEFAULT,
          description: {
            material: 'Rohmaterial Holz',
            group: 'Material(Holz)',
          }
        },
        {
          workPieceVariantCostId: 0,
          workPieceId: 0,
          workPieceVariantId: 0,
          isStandard: false,
          materialCost: 0,
          canProduce: PmCheckboxState.DEFAULT,
          description: {
            material: 'Rohmaterial Holz',
            group: 'Material(Holz)',
          }
        }
      ]
    }
  ],
  readonly: false,
  assemblyOnly: true,
  assemblyInvolved: true
}

