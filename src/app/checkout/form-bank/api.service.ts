import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpService: HttpService,
    private http: HttpClient
  ) { }

  cobre(service: string,data:any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredeintials: true };
    const url = 'https://production.toppaylatam.com/api/' + service;
    /* const url = 'http://localhost:3002/v1/' + service; */

    return this.http.post(url, data,options);
  }

  viewCobre(body:any): Observable<any>{ 
   /*  return this.cobre('cobre/tokenJwt',body); */
    return this.cobre('cobre/insert',body);
  }
 
}
