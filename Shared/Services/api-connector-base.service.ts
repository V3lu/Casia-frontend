import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class ApiConnectorBaseService {
  protected readonly http = inject(HttpClient);
  protected abstract readonly baseUrl: string;

  protected buildUrl(path: string): string {
    const normalizedBaseUrl = this.baseUrl.replace(/\/$/, '');
    const normalizedPath = path.replace(/^\//, '');
    return `${normalizedBaseUrl}/${normalizedPath}`;
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.buildUrl(path));
  }

  post<TResponse, TBody>(path: string, body: TBody): Observable<TResponse> {
    return this.http.post<TResponse>(this.buildUrl(path), body);
  }

  put<TResponse, TBody>(path: string, body: TBody): Observable<TResponse> {
    return this.http.put<TResponse>(this.buildUrl(path), body);
  }

  delete<TResponse>(path: string): Observable<TResponse> {
    return this.http.delete<TResponse>(this.buildUrl(path));
  }
}