import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../app/services/storage.service';
import { environment } from '../app/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const localUser = this.storageService.getLocalUser();

        const baseUrlSize = environment.baseUrl.length;
        const requestToAPI = req.url.substring(0, baseUrlSize) == environment.baseUrl;

        if (localUser && requestToAPI) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
