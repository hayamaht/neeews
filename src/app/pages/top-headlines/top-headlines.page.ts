import { Categories } from '~app/models/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Article } from '~app/models/article';
import { NewsApiService } from '~app/serivces/news-api.service';

@Component({
  selector: 'app-top-headlines',
  templateUrl: './top-headlines.page.html',
  styleUrls: ['./top-headlines.page.scss']
})
export class TopHeadlinesPage implements OnInit {

  articles!: Article[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsApiService: NewsApiService,
  ) { }

  ngOnInit(): void {
    // TODO: Re-write this
    this.activatedRoute.params.subscribe(p => {
      let c;
      if (p['category'] === Categories.BUSINESS ||
        p['category'] === Categories.ENTERTAINMENT ||
        p['category'] === Categories.GENERAL ||
        p['category'] === Categories.HEALTH ||
        p['category'] === Categories.SCIENCE ||
        p['category'] === Categories.SPORTS ||
        p['category'] === Categories.TECHNOLOGY
      ) {
        c = p['category'];
      } else {
        this.router.navigateByUrl('/top-headlines/general');
      }

      this.newsApiService
        .topHeadlines('tw', c)
        .subscribe(res => {
          this.articles = res.articles
        });
    });


  }

}
