import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, from, forkJoin } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { environment } from '@environment';

export type CallMethod = 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';

export interface CallManyOption {
  url: string;
  method: CallMethod;
  body: any | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  public call<T = any>(url: string, method: CallMethod = 'GET', body: any | null = null): Observable<HttpResponse<T>> {
    const formatedUrl = this.formatUrl(url);
    const fullUrl = `${environment.apiBaseUrl}${formatedUrl}`;
    const req = new HttpRequest(method, fullUrl, body);

    return <any>this.http.request<T>(req)
      .pipe(
        filter((event) => event.type === HttpEventType.Response)
      );
  }

  public callMany<T = any>(options: CallManyOption[]): Observable<HttpResponse<T>[]> {
    const observables: Observable<HttpResponse<T>>[] = [];

    options.forEach(params => {
      observables.push(this.call(params.url, params.method, params.body));
    });

    return forkJoin(observables);
  }

  public formatUrl(url: string): string {
		if (url.charAt(0) === '/') {
			return url;
		}

		return `/${url}`;
	}
}
