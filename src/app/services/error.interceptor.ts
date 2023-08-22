import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from "sweetalert2";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api

            }

            if (err.status === 400) {
                // auto logout if 400 response returned from api

                console.log('REQ:400-MSG: ', err);

            }

            if (err.status === 403) {
                // auto logout if 403 response returned from api


            }
          // localStorage.removeItem('accesstoken');
          // Swal.fire('Error','Token Expired','error');
          console.log('REQ:403-MSG: ', err);

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
