import { Injectable, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class Interceptor implements HttpInterceptor {
  constructor(
    public cookieService: CookieService,
    private router: Router,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = "EAAGG3jm0nTkBACdbAlJCnJSc7aArUmJPfZBj6umBfvbZCexgOKktmmUXoZBsG4G0Ioj79awChruWZAP9Je42btfo29oTDaLl4zSjgbGpqwnJ2onIITUWmppipN44yjPpTQUQBxvaibmJZC9Bi0i9z9gh2BnWDX80SC229j6ie5ybkHbkZAnZCwGtHgzzjW8aXiPZCRs0Qf8tLAZDZD";
    let request = req;
    if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
    }

    return next.handle(request).pipe(

      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl("/");
        }
        if (err.status === 403) {
          this.router.navigateByUrl("/");
        }
        return throwError(err);
      })
    );
  }
}
