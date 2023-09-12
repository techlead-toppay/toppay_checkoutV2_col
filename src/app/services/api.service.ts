import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpService: HttpService) { }

	request(service: string, data: object) {
		return this.httpService.api(service, data).pipe(response => response as Observable<ApiResponse>);
		// return this.httpService.api(service, data);
	}
	requestNode(service: string, data: object) {
		return this.httpService.node(service, data).pipe(response => response as Observable<ApiResponse>);
		// return this.httpService.api(service, data);
	}

	viewDateServer(): Observable<any> {

		return this.httpService.get();

	}
	methodGetNode(service: string): Observable<any> {

		return this.httpService.getNode(service);

	}

}
