import {
  IPmStatePopupLocalisations,
  IPmStateLockedPopupLocalisations,
  IPmFinalProductStepPopupLocalisations,
  pmStateLockedPopupLocalisations,
  pmStatePopupLocalisations,
  pmFinalProductStepPopupLocalisations
} from 'hsu-library';

export interface IGraphLocalisations {
  addStatePopup: IPmStatePopupLocalisations
  lockedStatePopup: IPmStateLockedPopupLocalisations
  finalProductNotePopup: IPmFinalProductStepPopupLocalisations
}

export const graphLocalisations:IGraphLocalisations = {
  addStatePopup: pmStatePopupLocalisations,
  lockedStatePopup: pmStateLockedPopupLocalisations,
  finalProductNotePopup: pmFinalProductStepPopupLocalisations
}
