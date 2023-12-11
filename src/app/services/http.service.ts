import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  api(serviceName: string, data: object): Observable<Object> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredeintials: false };

    const url = environment.url + serviceName;
    
    return this.http.post(url, data, options);
  }
  node(serviceName: string, data: object): Observable<Object> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredeintials: false };

    const url = environment.url + serviceName;
    return this.http.post(url, data, options);
  }

  get() {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredeintials: false };
    const url = 'https://production.toppaylatam.com/api/transactions/datetime';

    return this.http.get(url);
  }
  getNode(service: string) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredeintials: false };
    const url = environment.url + service;

    return this.http.get(url, options);
  }
  postNode(service: string) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredeintials: false };
    const url = environment.url + service;

    return this.http.post(url, options);
  }
}
