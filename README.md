# Newsweb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Pre-Step

Before building the application: 

## Change the `tsconfig.json`
1. Make change:
```json
{
  //...
  "compilerOptions": {
    //...
    "paths": {
      "~app": ["src/app/*"],
      "~env": ["src/environments/*"]
    }
  }
  //...
}
```
2. Restart the VS Code.


## Tailwind CSS for Angular

[Install Tailwind CSS with Angular](https://tailwindcss.com/docs/guides/angular)

1. Install tailwindcss via npm
```
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add the @tailwind directives for each of Tailwind's layers to your ./src/styles.css file.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install DaisyUI 

1. Install
```
npm i daisyui
```

2. tailwind.config.js
```ts
module.exports = {
  //...
  plugins: [
    require("daisyui"),
  ],
}
```

## Using News API

1. [News API](https://newsapi.org/account)
2. Using `API_KEY` in `src/environments/environment.ts` and `src/environments/environment.prod.ts`.
```ts
export const environment = {
  production: false,
  news_api_key: "API_KEY"
};
```
3. Generate the interceptor to attach `API_KEY` to a request via the `Authorization` HTTP header. The `src/app/new-api.interceptor.ts`:
```ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
  import { environment } from '~env/environment';

@Injectable()
export class NewsApiInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      'Authorization': `${environment.news_api_key}`,
      'X-Api-Key': `${environment.news_api_key}`
    }

    const req = request.clone({ setHeaders: headers });
    return next.handle(req);
  }
}
```

4. Change the file: `src/app/app.modele.ts`
```ts
//...
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//...
@NgModule({
  // ...
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsApiInterceptor, multi: true }
  ],
  // ...
})
```

5. Create Service `src/app/services/news-api.service.ts`
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private api = "https://newsapi.org/v2";

  constructor(
    private http: HttpClient
  ) { }

  topHeadlines() {
    // top-headlines?country=tw
    const country = 'tw'
    const url = `${this.api}/top-headlines?country=${country}`
    return this.http.get(url);
  }
}
```

6. Change file `src/app/app.module.ts`:
```ts
//...
import { HttpClientModule } from '@angular/common/http';
//...

@NgModule({
  //...
  imports: [
    //...
    HttpClientModule,
  ],
  //...
})
```

7. Can try to call News API in the `src/app/app.component.ts`

# Search news

## Seaech news in `src/app/services/news-api.service.ts`
1. Create a new model `src/app/models/article.ts`:
```ts
export interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
  source: Object;
}
```
And `src/app/models/new-response.ts`:
```ts
import { Article } from '~app/models/article';
export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
```

2. Create a method `search()`:
```ts
export class NewsApiService {

  private api = "https://newsapi.org/v2";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Search articles in the endpoint of `Everything`
   * @param term Keyword or phrases for in the article title and body.
   * @return
   */
  search(term: string): Observable<NewsResponse> {
    const url = `${this.api}/everything?q=${term}`;
    return this.http.get<NewsResponse>(url);
  }
}
```

3. Create a new component `src/app/components/search.component.ts`:
```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
    <div class="p-5">
      <input
        #searchField
        type="search"
        placeholder="What do you want to search?"
        (keyup.enter)="search(searchField.value)"
        class="input input-bordered w-full p-4 focus:input-primary"
      >
    </div>
  `,
})
export class SearchComponent {

  constructor(
    private router: Router
  ) { }

  search(term: string) {
    if (!term) return;
    this.router.navigateByUrl(`/search/${term}`);
  }
}
```

4. Create a new component `src/app/components/article.component.ts`. 
```ts
import { Component, Input } from '@angular/core';
import { Article } from '~app/models/article';

@Component({
  selector: 'app-article',
  template: `
    <div class="
      rounded-lg shadow-md
      bg-white border border-gray-200
    ">

      <img
        [src]="article.urlToImage"
        [alt]="article.title"
        class="rounded-t-lg"
      />

      <div class="p-5">
        <p class="border-l-4 border-l-secondary pl-2 font-light">
          {{ article.publishedAt | date:'yyyy-MM-dd HH:mm:ss' }}
        </p>
        <a [href]="article.url" target="_blank">
          <h5 class="mb-2 text-2xl font-bold tracking-tight hover:underline">
            {{ article.title }}
          </h5>
        </a>
        <!-- <p class="font-mono font-thin text-sm mb-4">{{ article.author }}</p> -->
        <!-- <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> -->
        <a [href]="article.url" target="_blank"
          class="
            mt-4 px-3 py-2 text-sm
            inline-flex items-center
            font-medium text-center rounded-lg
            bg-primary text-white
            hover:bg-blue-800 focus:ring-4
            focus:outline-none focus:ring-secondary
        ">
          Read more
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>
    </div>
  `,
})
export class ArticleComponent  {
  @Input()
  article!: Article;
}
```

5. Create a new page `src/app/pages/home.page.{html,ts,scss,spec}`:
```
ng g c pages/home --type=page
```

6. Edit `src/app/pages/home.page.ts`:
```ts
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsApiService: NewsApiService,
  ) { }

  ngOnInit(): void {
    // TODO: Usig rxjs
    this.activatedRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        this.newsApiService
          .search(params['searchTerm'])
          .subscribe(res => {
            this.articles = res.articles;
          });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
}****
```

7. Edit `src/app/pages/home.page.html`:
```html
<app-search></app-search>

<div *ngIf="articles">
  <h1 class="text-2xl text-center font-black my-4">
    Search Resule
  </h1>

  <div class="
    m-4 inline-grid gap-2
    md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  ">
    <app-article
      *ngFor="let article of articles"
      [article]="article"
    ></app-article>

  </div>
</div>

<div *ngIf="!articles">
  <h1 class="text-2xl text-center font-black my-4">
    Top Headline
  </h1>
</div>
```
