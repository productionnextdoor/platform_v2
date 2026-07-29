import {
  Icon
} from '../../pm-icon/pm-icon.shared';

export interface IActionButtonElement {
  icon: Icon,
  link: string,
  type: EActionButtonElementType
}

export enum EActionButtonElementType {
  DEVELOPER_PRODUCT_WIZARD = 'developer_product_wizard',
  PRODUCT_CREATE = 'product_create',
  PRODUCT_DETAILS = 'product_details',
  PRODUCT_PRODUCER = 'product_producer',
  PRODUCT_WORKSTEP = 'product_workstep',
  ORDER_DETAILS = 'order_details',
  RE_REQUEST_ACTION = 're-request-action',
}

