import {
  Component,
  Input as RouteParam,
  OnInit
} from '@angular/core';
import { PERMISSIONS } from '../../services/permissions/permissions';
import { IPermissionManagerService } from '../../services/permissions/ipermission-manager.service';



export enum EOrderDetailsPageType {
  ADMIN = 'admin',
  PRODUCER = 'producer',
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit  {

  @RouteParam()
  orderId: number = 0;

  protected detailsPageType: EOrderDetailsPageType = EOrderDetailsPageType.ADMIN;

  protected readonly EOrderDetailsPageType: typeof EOrderDetailsPageType = EOrderDetailsPageType;

  constructor(
    private readonly permissionService: IPermissionManagerService,
  ) {
  }

  ngOnInit(): void {
    this.setDetailsPageType();
  }

  private setDetailsPageType(): void {
    if (this.permissionService.isGranted(PERMISSIONS.orderManagement.overview.admin)) {
      this.detailsPageType = EOrderDetailsPageType.ADMIN;
    }

    if (this.permissionService.isGranted(PERMISSIONS.orderManagement.overview.producer)) {
      this.detailsPageType = EOrderDetailsPageType.PRODUCER;
    }
  }
}
