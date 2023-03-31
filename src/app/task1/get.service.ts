import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GetService {

	constructor(private _http: HttpClient) { }

	getdata() {
		return this._http.get("http://www.mocky.io/v2/5ea172973100002d001eeada");
	}
}
