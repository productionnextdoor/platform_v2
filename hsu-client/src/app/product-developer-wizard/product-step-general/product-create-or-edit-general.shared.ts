export interface IGeneralInfoDto {
  productId: number;
  productName: string;
  productNumber: number;
  creationTime:string
  height: number;
  width: number;
  depth: number;
  quantity?: number | undefined;
  offerDeadline?: string | undefined;
  productionDeadLine?: string | undefined;
}

export const defaultGeneralInfoDto: IGeneralInfoDto = {
  productId: 0,
  productName: "",
  productNumber: 0,
  creationTime: "",
  height: 0,
  width: 0,
  depth: 0,
  quantity: 0,
  offerDeadline: "",
  productionDeadLine: ""
}
