import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Categories } from '~app/models/categories';
import { NewsApiService } from '~app/serivces/news-api.service';

@Component({
  selector: 'app-nav',
  template: `
    <div class="navbar">
      <div class="navbar-start">
        <!-- <div class="dropdown dropdown-bottom">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
          </label>
          <ul class="
            menu menu-compact dropdown-content
            w-52 bg-base-100
            shadow rounded
            outline outline-1 outline-gray-300
          ">
            <li>
              <button
                (click)="setCategory(Categories.BUSINESS)">
                Busines
              </button>
            </li>
            <li>
              <button
                (click)="setCategory(Categories.ENTERTAINMENT)">
                Entertainment
              </button>
            </li>
            <li><button (click)="setCategory(Categories.GENERAL)">General</button></li>
            <li><button (click)="setCategory(Categories.HEALTH)">Health</button></li>
            <li><button (click)="setCategory(Categories.SCIENCE)">Science</button></li>
            <li><button (click)="setCategory(Categories.SPORTS)">Sports</button></li>
            <li><button (click)="setCategory(Categories.TECHNOLOGY)">Technology</button></li>
          </ul>
        </div> -->
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
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg class="w-6 h-6" fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd"></path>
            </svg>
          </label>
          <ul class="
            menu menu-compact dropdown-content
            w-52 bg-base-100
            shadow rounded
            outline outline-1 outline-gray-300
          ">
            <li><a href="">TW</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
