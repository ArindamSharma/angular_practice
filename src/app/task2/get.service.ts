import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private _http: HttpClient) { }

  getdata() {
    // return this._http.get("https://mocki.io/v1/6237ceb7-e2a6-4410-9de0-bd94ed69e502");
    // return this._http.get("http://www.mocky.io/v2/5ea172973100002d001eeada");
    return this._http.get("https://fakestoreapi.com/products/");
  }
}