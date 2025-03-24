import {
  IInviteDeveloperPopupLocalisations
} from '../../../lib/layouts/pm-invite-developer-popup/pm-invite-developer-popup.shared';

export interface IInviteDeveloperPopupData {
  localisations: IInviteDeveloperPopupLocalisations;
}

export const inviteDeveloperPopupData: IInviteDeveloperPopupData = {
  localisations: {
    title: 'Neuen Entwickler eintragen',
    description: 'Um einen Entwickler auf die Plattform einzuladen, sind die mit * gekennzeichneten Felder Pflicht. Ohne diese Angaben kann kein Account erstellt werden.',
    subTitle: 'Angaben zum Entwickler',
    inputNameLabel: 'Name',
    inputNamePlaceholder: 'Namen eingeben',
    inputMailLabel: 'E-Mail-Adresse',
    inputMailPlaceholder: 'E-Mail-Adresse eingeben',
    cancelLabel: 'Abbrechen',
    inviteLabel: 'Einladung senden',
    emailNotValidError: 'Bitte gib eine gültige E-Mail-Adresse ein'
  }
}
