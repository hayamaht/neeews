import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsResponse } from '~app/models/news-response';
import { Categories } from '~app/models/categories';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private api = "https://newsapi.org/v2";

  constructor(
    private http: HttpClient
  ) { }

  topHeadlines(
    country: string = 'tw',
    category: Categories = Categories.NONE,
    q?: string,
    pageSize: number = 20,
    page: number = 1,
  ): Observable<NewsResponse> {
    const t = `${this.api}/top-headlines`;
    const c = `?country=${country}`;
    const ct = (category !== Categories.NONE)
      ? `&category=${category}`
      : '';
    const qt = (q !== undefined && q !== '')
      ? `&q=${q}`
      : '';
    const ps = `&pageSize=${pageSize}`;
    const p = `&page=${page}`;

    const url = t + c + ct + qt + ps + p;

    console.log(url);

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
