import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '~app/app-routing.module';
import { AppComponent } from '~app/app.component';
import { NewsApiInterceptor } from '~app/new-api.interceptor';
import { SearchComponent } from './components/search/search.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesPage } from './pages/articles/articles.page';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArticleComponent,
    ArticlesPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
