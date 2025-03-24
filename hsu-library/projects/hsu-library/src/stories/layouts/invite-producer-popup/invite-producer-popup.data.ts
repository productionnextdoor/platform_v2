import { IInviteProducerPopupLocalisations } from '../../../lib/layouts/pm-invite-producer-popup/pm-invite-producer-popup.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';

interface IInviteProducerPopupData {
  localisations: IInviteProducerPopupLocalisations;
  tradeOptions: PmDropdownOption<string>[];
}

export const InviteProducerPopupData: IInviteProducerPopupData = {
  localisations: {
    title: 'Neuen Produzenten eintragen',
    description: 'Um einen Produzenten auf die Plattform einzuladen, sind die mit * gekennzeichneten Felder Pflicht. ' +
      'Ohne diese Angaben kann kein Account erstellt werden. Die Wertkettenparameter kannst du nach der Registrierung des Produzenten eintragen.',
    form: {
      title: 'Angaben zum Unternehmen',
      companyNameLabel: 'Name d. Unternehmens',
      companyNamePlaceholder: 'Unternehmen eingeben',
      tradeLabel: 'Gewerk',
      tradePlaceholder: 'Gewerk auswählen',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'E-Mail-Adresse eingeben',
      contactPersonLabel: 'Ansprechpartner im Unternehmen',
      contactPersonPlaceholder: 'Ansprechpartner angeben',
    },
    cancelButtonLabel: 'Abbrechen',
    inviteButtonLabel: 'Einladung senden',
    emailNotValidError: 'Bitte gib eine gültige E-Mail-Adresse ein'
  },
  tradeOptions: [
    {
      key: '0',
      value: 'Schreinerei'
    },
    {
      key: '1',
      value: 'Glaserei'
    },
    {
      key: '2',
      value: 'Metallbauer'
    },
  ]
}
