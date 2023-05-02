import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';
import { BehaviorSubject, of, tap } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private sharedDataSubject = new BehaviorSubject<string>('');
  cacheMap = new Map<string, HttpResponse<any>>();
  constructor(private apiService: ApiService) { }


  setSharedData(data: string) {
    this.sharedDataSubject.next(data);
  }

  getSharedData() {
    return this.sharedDataSubject.asObservable();
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }


  getAllBooks(subjectName: string): Observable<BookResponse> {
    const limit = 10;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  }
  getAllBooksSearch(subjectName: string): Observable<BookResponse> {
    const limit = 100;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  }
  searchBooks(page: number, searchTerm: string): Observable<BookResponse> {
    const limit = 10;
    const offset = (page - 1) * limit;
    const searchQuery = searchTerm.toLowerCase().split(' ').join('_');
    const url = `/subjects/${searchQuery}.json?q=&limit=${limit}&offset=${offset}`;
    const cachedResponse = this.get(url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return this.apiService.get<BookResponse>(url).pipe(
      tap(response => {
        this.set(url, response);
      })
    );
  }

}
