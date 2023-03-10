import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from '~app/app-routing.module';
import { AppComponent } from '~app/app.component';
import { NewsApiInterceptor } from '~app/new-api.interceptor';
import { HomePage } from '~app/pages/home/home.page';
import { TopHeadlinesPage } from '~app/pages/top-headlines/top-headlines.page';
import { SearchComponent } from '~app/components/search/search.component';
import { ArticleComponent } from '~app/components/article/article.component';
import { NavComponent } from '~app/components/nav/nav.component';
import { FilterPipe } from '~app/shared/filter.pipe';
import { HighlightDirective } from '~app/shared/highlight.directive';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArticleComponent,
    NavComponent,
    HomePage,
    TopHeadlinesPage,
    FilterPipe,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
