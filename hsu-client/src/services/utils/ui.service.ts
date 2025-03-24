import {
  Injectable
} from '@angular/core';
import {
  IUiService
} from './iui.service';

@Injectable()
export class UiService extends IUiService {
  showBusyIndicator(): void {
    abp.ui.setBusy();
  }
  hideBusyIndicator(): void {
    abp.ui.clearBusy();
  }
}
