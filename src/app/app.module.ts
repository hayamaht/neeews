import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from '~app/app-routing.module';
import { AppComponent } from '~app/app.component';
import { NewsApiInterceptor } from '~app/new-api.interceptor';
import { HomePage } from '~app/pages/home/home.page';
import { TopHeadlinesPage } from '~app/pages/top-headlines/top-headlines.page';
import { SearchComponent } from '~app/components/search/search.component';
import { ArticleComponent } from '~app/components/article/article.component';
import { NavComponent } from '~app/components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArticleComponent,
    NavComponent,
    HomePage,
    TopHeadlinesPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
