import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(
    private http: HttpClient
  ) { }

  path: string = "response";

  create(data: any): Observable<any> {
    return this.http
      .post<any>(API + "/" + this.path, data)
      .pipe(
        map((response) => response),
        tap((a) => {
          console.log('guardado correctamente');
          console.log(a);
        })
      );
  }
}
