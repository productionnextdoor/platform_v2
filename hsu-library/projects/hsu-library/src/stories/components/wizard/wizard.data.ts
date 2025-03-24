import { EPmInputType } from '../../../lib/components/pm-input/pm-input.component';
import { IPmWizardLocalisations } from '../../../lib/components/pm-wizard/pm-wizard.shared';

export interface IPmWizardData {
  context: string,
  title: string,
  steps: string[],
  localisations: IPmWizardLocalisations
  ngContent: string
}

export const wizardData: IPmWizardData = {
  context: 'Produktentwurf:',
  title: 'Kommode Alpha',
  steps: [
    'Allgemeine Angaben',
    'Materialstückgruppen',
    'Produktvarianten'
  ],
  localisations: {
    cancel: 'Abbrechen',
    draft: 'Angaben speichern',
    save: 'Produkt einreichen',
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
  ngContent: `
    <ng-template>
        <h3>Allgemeine Angaben zum Produktstandard</h3>
        <p>Trage hier den Produktnamen sowie die Produktgröße des Produktstandards ein. Achte darauf, einen
           aussagekräften Produktnamen einzutragen, sollte es von diesem Produkt verschiedene Varianten
           (unterschiedliche Produkte aufgrund von unterschiedlichen Wertketten) geben.</p>
        <pm-input label="Message" type="${EPmInputType.TEXTAREA}" placeholder="Message" />
    </ng-template>
    <ng-template>
        <h3>Beteiligte Materialgruppen im Produktstandard</h3>
        <p>Wähle die Materialgruppe(n) aus, die im Produktstandard verwendet werden (min. eine Materialgruppe).
           Gib bitte auch die zu bearbeitende Oberflächenbeschaffenheit sowie den finalen Zustand der jeweiligen
           Materialgruppe im Produktionsprozess an. Beachte auch, dass die Auswahl der Materialgruppe(n) Auswirkung auf
           die Produktvarianten hat.</p>
    </ng-template>
    <ng-template>
        <h3>Varianten zum Produktstandard</h3>
        <p>In welchen alternativen Varianten soll das Produkt angeboten werden? Füge die Abweichungen über den
           Plus-Button in den entsprechenden Kategorien hinzu.</p>
    </ng-template>
  `
}
