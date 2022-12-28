import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '~app/models/article';
import { NewsApiService } from '~app/services/news-api.service';

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

  }

}
