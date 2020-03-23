import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   
   export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            console.log(error)
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error

              errorMessage = `Error: ${error.error.message}`;
              console.log(errorMessage)
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}
              \n Error type: ${error.error.error}
              \nMessage: ${error.error.details}`;
            }
            window.alert(errorMessage);
            return throwError(errorMessage);
          })
        )
    }
   }