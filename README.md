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


# Step

## Tailwind CSS for Angular

[Install Tailwind CSS with Angular](https://tailwindcss.com/docs/guides/angular)

1. Install tailwindcss via npm
```
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. tailwind.config.js
```
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
```
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
```
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
3. 
