
import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      // "Access-Control-Allow-Origin": "*",
    };
    // Passing token to http header
    const token = localStorage.getItem('accesstoken');
    if (token) {
      headersConfig['authorization'] = token;
      const authReq = req.clone({ setHeaders: headersConfig });
      return next.handle(authReq);
    }
    const authReq = req.clone({ setHeaders: headersConfig });
    return next.handle(authReq);
  }
}
