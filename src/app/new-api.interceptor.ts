import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';


@Injectable()
export class NewsApiInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      'Authorization': `${environment.news_api_key}`,
      'X-Api-Key': `${environment.news_api_key}`
    }

    const req = request.clone({ setHeaders: headers });
    return next.handle(req);
  }
}
