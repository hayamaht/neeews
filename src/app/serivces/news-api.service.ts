import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsResponse } from '~app/models/news-response';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private api = "https://newsapi.org/v2";

  constructor(
    private http: HttpClient
  ) { }

  topHeadlines(): Observable<NewsResponse> {
    // top-headlines?country=tw
    const country = 'tw'
    const url = `${this.api}/top-headlines?country=${country}`
    return this.http.get<NewsResponse>(url);
  }

  /**
   * Search articles in the endpoint of `Everything`
   * @param term Keyword or phrases for in the article title and body.
   * @return
   */
  search(term: string): Observable<NewsResponse> {
    const url = `${this.api}/everything?q=${term}`;
    return this.http.get<NewsResponse>(url);
  }
}
