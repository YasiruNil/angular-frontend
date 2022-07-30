import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorageToken: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageToken.getItem();
    const isUrl = request.url.startsWith('http://localhost:4000/api/v1');

    if (token && isUrl) {
      request = request.clone({
        setHeaders: {
          ['x-access-token']: `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
