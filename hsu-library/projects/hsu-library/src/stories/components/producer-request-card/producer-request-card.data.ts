import {
  IProducerResponseRequestLocalisation
} from '../../../lib/components/pm-producer-request-card/pm-producer-request-card.shared';


interface IProducerResponseData {
  localisationStrings: IProducerResponseRequestLocalisation;

}

export const producerResponseRequestLocalisation:IProducerResponseData = {
  localisationStrings: {
    cardText: 'Wenn du an der Bearbeitung des unten aufgeführten Produkts teilnehmen möchtest,' +
      ' klicke bitte auf „Planungsanfrage annehmen“ und trage anschließend in der folgenden Ansicht ' +
      'deine Produktionsschritte in die Wertkette ein. Wenn du nicht an der Planung des Produkts teilnehmen möchtest, ' +
      'klicke bitte auf „Planungsanfrage ablehnen“.',
    acceptButtonText: 'Planungsanfrage annehmen',
    rejectButtonText: 'Planungsanfrage ablehnen'
  }
}
