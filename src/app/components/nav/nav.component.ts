import { Component, OnInit } from '@angular/core';
import { CountryNewsService } from '~app/services/country-news.service';

@Component({
  selector: 'app-nav',
  template: `
    <div class="navbar">
      <div class="navbar-start">
        <img src="assets/flags/1x1/{{currentCountry}}.svg"
          class="
            w-8 h-8 rounded-full m-2
            outline outline-2 outline-offset-2
            outline-secondary
          "
          alt="">
      </div>
      <div class="navbar-center">
        <a routerLink="/">
          <h1 class="
            text-2xl text-center font-extrabold my-6
            text-primary
          ">
            N<span class="text-secondary">e</span>eews
          </h1>
        </a>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">

          <label tabindex="0"
            class="
              btn btn-sm btn-secondary btn-circle
              text-white m-2
              outline outline-2 outline-offset-2
              outline-secondary
          ">
            <svg class="w-5 h-5 outline-" fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd"></path>
            </svg>
          </label>

          <ul tabindex="0" class="
            menu menu-compact dropdown-content
            w-52 bg-base-100
            shadow rounded
            outline outline-1 outline-gray-300
          ">

            <div class="
              form-control justify-center p-2
              bg-secondary
            ">
              <input type="text"
                [(ngModel)]="searchText"
                placeholder="Enter country name"
                tabindex="0"
                autofocus
                class="max-w-xs
                  input input-bordered input-sm
                  inline-flex
              ">
            </div>

            <li *ngFor="let c of avaliableCountries | appFilter: searchText">
              <button appHighlight
                (click)="changeCountryCode(c.code, $event)"
                [title]="c.name"
                [searchedWord]="searchText"
                [content]="c.name"
                [setTitle]="true"
                classToApply="font-black text-gray-600"
                class="gap-0"
              >
                {{ c.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

    </div>
  `,
})
export class NavComponent implements OnInit {

  searchText = '';
  currentCountry = '';
  avaliableCountries!: {name: string, code: string}[];

  constructor(
    private countryNewsService: CountryNewsService
  ) { }

  ngOnInit(): void {
    this.currentCountry = this.countryNewsService.getCountryCode();
    this.avaliableCountries = this.countryNewsService.getAvaliableCountryNames();
  }

  changeCountryCode(code: string, event: Event) {
    const el = event.target as HTMLElement;
    el.blur();
    this.searchText = '';
    this.currentCountry = code;
    this.countryNewsService.changeCountryCode(code);
  }

}
