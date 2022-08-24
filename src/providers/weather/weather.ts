import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }
  getWeather(city: string, units: string): Observable<any> {
    
    return this.http.get("https://api.weatherbit.io/v2.0/forecast/current?&city=" + city + "&units=" + units + "&key=06e24c74d3454a8caeebd22d04e46900")
  }
}
