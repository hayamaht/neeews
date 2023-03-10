import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NewsResponse } from '~app/models/news-response';
import { Categories } from '~app/models/categories';
import { UrlParams } from '~app/shared/url-params';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private _api = "https://newsapi.org/v2";
  private _urlTopHeadlines = `${this._api}/top-headlines?`;
  private _curUrlTopHeadlines = '';

  private countrySource = new Subject<string>();

  country$ = this.countrySource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  changeCountry(countryCode: string | undefined) {
    console.log(countryCode);
    if (countryCode === undefined) {
      countryCode = 'us';
    }

    countryCode = countryCode.toLowerCase();

    // return this.topHeadlines({
    //   'country': countryCode
    // });
    this.countrySource.next(countryCode);
  }

  topHeadlines(
    params: {[key: string]: string}
  ): Observable<NewsResponse> {
    if (!this._curUrlTopHeadlines) {
      this._curUrlTopHeadlines = this._urlTopHeadlines;
    }

    this._curUrlTopHeadlines = UrlParams.get(
      this._curUrlTopHeadlines,
      params
    );

    return this.http.get<NewsResponse>(this._curUrlTopHeadlines);
  }

  /**
   * Search articles in the endpoint of `Everything`
   * @param term Keyword or phrases for in the article title and body.
   * @return
   */
  search(term: string): Observable<NewsResponse> {
    const url = `${this._api}/everything?q=${term}`;
    return this.http.get<NewsResponse>(url);
  }


}
