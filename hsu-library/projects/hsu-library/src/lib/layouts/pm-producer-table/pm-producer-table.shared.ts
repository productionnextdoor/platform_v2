export interface IProducerTableLocalisation {
  cardTitle: string;
  description: string;
  paginationTotalText: string;
  requestButtonLabel: string;
  deadline: string;
  popup: IProducerTablePopupLocalisation;
  requestPopup: IProducerRequestPopupLocalisation
}

export interface IProducerTablePopupLocalisation {
  title: string;
  description: string;
  inputLabel: string;
  cancelButtonLabel: string;
  confirmButtonLabel: string;
}

export interface IProducerRequestPopupLocalisation {
  title: string;
  description: string;
  cancelButtonLabel: string;
  confirmButtonLabel: string;
}

export interface IProducersRequest {
  deadlineDate: string;
  producersIds: number[];
}

export const ProducerTableLocalisation: IProducerTableLocalisation = {
  cardTitle: '',
  description: '',
  paginationTotalText: '',
  requestButtonLabel: '',
  deadline: '',
  popup: {
    title: '',
    description: '',
    inputLabel: '',
    cancelButtonLabel: '',
    confirmButtonLabel: ''
  },
  requestPopup: {
    title: '',
    description: '',
    cancelButtonLabel: '',
    confirmButtonLabel: ''
  }
}
