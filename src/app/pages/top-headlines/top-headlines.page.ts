import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Article } from '~app/models/article';
import { NewsResponse } from '~app/models/news-response';
import { NewsApiService } from '~app/serivces/news-api.service';

@Component({
  selector: 'app-top-headlines',
  templateUrl: './top-headlines.page.html',
  styleUrls: ['./top-headlines.page.scss']
})
export class TopHeadlinesPage implements OnInit {

  articles!: Article[];
  total!: number;
  page = 1;
  perPage = 20;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsApiService: NewsApiService,
  ) { }

  ngOnInit(): void {
    const c = this.activatedRoute.snapshot.params['category'];
    if (!c) {
      this.router.navigateByUrl('/top-headlines/general');
      return;
    }

    this.activatedRoute.params.subscribe(p => {
      this.getNews({
        'country': 'tw',
        'category': p['category'],
        'page': '1'
      });
    });
  }

  getArticles(res: NewsResponse) {
    this.total = res.totalResults;
    this.articles = res.articles;
  }

  getNews(params: {[key: string]: string}) {
    this.newsApiService
      .topHeadlines(params)
      .subscribe(res => this.getArticles(res));
  }

  getPage(page: number) {
    this.page = page;
    this.getNews({
      'page': page.toString()
    });
  }

}
