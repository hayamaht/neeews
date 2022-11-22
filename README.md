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
```typescript
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
```
export const environment = {
  production: false,
  news_api_key: "API_KEY"
};
```
3. Generate the interceptor to attach `API_KEY` to a request via the `Authorization` HTTP header. The `src/app/new-api.interceptor.ts`:
```typescript
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
```typescript
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
```typescript
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
```typescript
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
