import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '~app/serivces/news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newsweb';

  constructor(
    private newsApiService: NewsApiService
  ) {}

  ngOnInit(): void {
    this.newsApiService.topHeadlines().subscribe(req => {
      console.log(req)
    });
  }


}
