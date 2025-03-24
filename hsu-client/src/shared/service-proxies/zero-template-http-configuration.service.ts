import {
  Injectable
} from '@angular/core';
import {
  AbpHttpConfigurationService,
  LogService,
  MessageService,
  TokenService
} from 'abp-ng2-module';
import {
  Router
} from '@angular/router';
import {
  Path
} from '../../app/app-routing.module';
import {
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ZeroTemplateHttpConfigurationService extends AbpHttpConfigurationService {
  constructor(
    messageService: MessageService,
    private router: Router,
    private tokenService: TokenService,
    private logService: LogService
  ) {
    super(messageService, logService);
  }


  // Override unauthorized request error (401) to first redirect
  // to some save url and then show corresponding error
  //TODO: Since we probably won't have nonApb responses we need to check if it's needed at all
  //More info about apb and non apb responses https://aspnetboilerplate.com/Pages/Documents/Javascript-API/AJAX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleNonAbpErrorResponse(response: HttpResponse<any>) {
    switch (response.status) {
    case HttpStatusCode.Unauthorized:
      this.redirectAndShowUnAuthorizedError();
      break;
    case HttpStatusCode.Forbidden:
      this.showError(this.defaultError403);
      break;
    case HttpStatusCode.NotFound:
      this.showError(this.defaultError404);
      break;
    default:
      this.showError(this.defaultError);
      break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleAbpResponse(response: any, ajaxResponse: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseClone: any = response.clone({
      body: ajaxResponse.result
    });

    if (ajaxResponse.success) {
      if (ajaxResponse.targetUrl) {
        this.logService.info('ajax response: ' + ajaxResponse.targetUrl);
        this.handleTargetUrl(ajaxResponse.targetUrl);
      }
    }
    else {
      if (!ajaxResponse.error) {
        ajaxResponse.error = this.defaultError;
      }
      this.logError(ajaxResponse.error);
      this.showError(ajaxResponse.error);
      if (response.status === HttpStatusCode.Unauthorized) {
        this.handleUnAuthorizedRequest(this.showError(ajaxResponse.error), ajaxResponse.targetUrl);
      }
    }
    return responseClone;
  }

  //TODO: Since we probably won't have nonApb responses we need to check if it's needed at all
  //More info about apb and non apb responses https://aspnetboilerplate.com/Pages/Documents/Javascript-API/AJAX
  private redirectAndShowUnAuthorizedError(url: string = Path.DEFAULT) {
    const navigationUrl: string = this.tokenService.getToken() ?
      url :
      Path.LOGIN;
    this.router.navigate([navigationUrl])
      .then(() => {
        this.showError(this.defaultError401);
      });
  }
}
