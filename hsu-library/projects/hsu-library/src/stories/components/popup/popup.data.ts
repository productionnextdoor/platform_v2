export interface IPopupData {
  title: string
  ngContent: string
}

export const popupData: IPopupData = {
  title: 'Produzenten anfragen',

  // Ignore the shitty html with the inline styles. This is just for the demo and should not be used in production.
  // In a real world scenario, the ngContent would be used inside a different component, where the styles are defined.
  ngContent:
    '<ng-container>' +
      '<p>Bist du sicher, dass du die ausgewählten Produzenten für das Produkt anfragen möchtest?</p>' +
      '<p>Die Produzenten werden dann freigeschaltet, um ihre Arbeitsschritte innerhalb der Bearbeitungsfrist in die Produktionskette des Produkts einzutragen.</p>' +
    '</ng-container>' +
    '<ng-container footer>' +
      '<pm-button label="Abbrechen" type="secondary" style="margin-right: 24px" />' +
      '<pm-button label="Bestätigen" />' +
    '</ng-container>'
}
