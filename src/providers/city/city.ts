import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the CityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CityProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CityProvider Provider');
  }


  getCities(): Observable<any> {
  var cities=[];
   this.http.get('https://restcountries.com/v3.1/all').subscribe((response) => {
  cities.push(response);
});return cities;
  }
}
