import { StorageService } from "./../app/services/storage.service";
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

import { Observable } from "rxjs";
import { IFieldMessage } from "../app/models/field-message.model";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private alertCtrl: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro detectado pelo interceptor:");
      console.log(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;

        case 422:
          this.handle422(errorObj);
          break;

        default:
          this.handleDefaultEror(errorObj);
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: "Erro 401: falha de autenticação",
      message: "Email ou senha incorretos",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
        },
      ],
    });
    alert.present();
  }

  handle403() {
    this.storageService.setLocalUser(null);
  }

  handle422(errorObj) {
    let alert = this.alertCtrl.create({
        title: 'Erro 422: Validação',
        message: this.listErrors(errorObj.errors),
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();
}

  handleDefaultEror(errorObj) {
    let alert = this.alertCtrl.create({
      title: "Erro " + errorObj.status + ": " + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
        },
      ],
    });
    alert.present();
  }

  private listErrors(messages : Array<IFieldMessage>) : string {
    let errors = '';
    messages.forEach( message => {
      errors += '<p><strong>' + message.fieldName + "</strong>: " + message.message + '</p>'
    })

    return errors;
}
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
