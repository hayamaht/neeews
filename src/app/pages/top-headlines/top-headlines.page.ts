import { CountryNewsService } from '~app/services/country-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterContentChecked, AfterViewChecked, Component, OnChanges, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from '~app/models/article';
import { NewsResponse } from '~app/models/news-response';
import { NewsApiService } from '~app/services/news-api.service';
import { Subscription } from 'rxjs';

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
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsApiService: NewsApiService,
    private countryNewsService: CountryNewsService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    const cat = this.activatedRoute.snapshot.params['category'];
    if (!cat) {
      this.router.navigateByUrl('/top-headlines/general');
      return;
    }

    this.countryNewsService.countryCode$.subscribe(code => {
      this.page = 1;
      this.getNews({
        'country': code,
        'category': cat,
        'page': '1'
      });
    });

    this.activatedRoute.params.subscribe(p => {
      this.page = 1;
      this.getNews({
        'country': this.countryNewsService.currentCountryCode,
        'category': p['category'],
        'page': '1'
      });
    });
  }

  gotoTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getArticles(res: NewsResponse) {
    this.loading = false;
    this.spinner.hide();
    this.total = res.totalResults;
    this.articles = res.articles;
  }

  getNews(params: {[key: string]: string}) {
    this.loading = true;
    this.spinner.show();
    this.gotoTop();
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
