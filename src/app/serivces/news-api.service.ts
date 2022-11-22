import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private api = "https://newsapi.org/v2";

  constructor(
    private http: HttpClient
  ) { }

  topHeadlines() {
    // top-headlines?country=tw
    const country = 'tw'
    const url = `${this.api}/top-headlines?country=${country}`
    return this.http.get(url);
  }

}
