import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
  }
  //-----info from NewsAPI  https://newsapi.org/docs/endpoints/top-headlines----


   getNews(country:string, category:string): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"apiKey=8f1cdaf0d66e456c857e124e36fe9d04");
  }
}
