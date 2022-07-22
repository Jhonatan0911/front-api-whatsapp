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
    const token: string = "EAAGG3jm0nTkBAJ4WgjdPpP6iGBMoMXNlrdzciYYE11JiCdv2vtTNzmFcWbmPgBYqI4mIjGd2l6uTjB0eFU0CMdm7K4CvpACDUyEGMqCifggqhZAiS9VKPTwUCB7t3QWuNjsQ0rXPswQT0iTpfFM6J7GUnktwlnpeZB2MPpf1U3q3FrgD5PNITtDFZCjrMOoroFDw4fm7wZDZD";
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
