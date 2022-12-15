import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '~app/models/article';
import { NewsApiService } from '~app/serivces/news-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  articles: Article[] | undefined;
  isSearch = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsApiService: NewsApiService,
  ) { }

  ngOnInit(): void {
    // TODO: Usig rxjs
    this.activatedRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        this.isSearch = true;
        this.newsApiService
          .search(params['searchTerm'])
          .subscribe(res => {
            this.articles = res.articles;
          });
      } else {
        //this.router.navigateByUrl('/');
        this.isSearch = false;
        this.newsApiService
          .topHeadlines('tw')
          .subscribe(res => {
            this.articles = res.articles;
          });
      }
    });
  }

}
