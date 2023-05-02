import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectsService } from '../services/subjects.service';
import { Observable, of, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: SubjectsService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const cachedResponse = this.cacheService.get(request.url);
  
      if (cachedResponse) {
        return of(new HttpResponse({ body: cachedResponse }));
      }
  
      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheService.set(request.url, event.body);
          }
        })
      );
    }
  }