import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = 'https://reqres.in';

  constructor(private http: HttpClient) { }

  getReq(path: string, options?: Object): Observable<any> {
    return this.http.get(`${this.baseURL}${path}`, options);
  }

  postReq(path: string, data?: any, options?: Object): Observable<any> {
    return this.http.post(`${this.baseURL}${path}`, data, options);
  }

  putReq(path: string, data?: any, options?: Object): Observable<any> {
    return this.http.put(`${this.baseURL}${path}`, data, options);
  }

  deleteReq(path: string, options?: Object): Observable<any> {
    return this.http.delete(`${this.baseURL}${path}`, options);
  }
}
