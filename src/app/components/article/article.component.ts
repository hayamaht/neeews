import { Component, Input } from '@angular/core';
import { Article } from '~app/models/article';

@Component({
  selector: 'app-article',
  template: `
    <div class="
      rounded-lg shadow-md
      bg-white border border-gray-200
    ">

      <ng-container *ngIf="article.urlToImage; else elseTemplate">
        <div class="
        bg-gray-200 rounded-t-lg w-full
          flex items-center justify-center
        ">
          <img
            data-src="{{ article.urlToImage }}"
            data-sizes="auto"
            [alt]="article.title"
            (error)="errorImage($event)"
            class="rounded-t-lg lazyload"
          />
        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <div class="h-56 bg-gray-300 rounded-t-lg flex justify-center items-center ">
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-12 h-12 fill-gray-400 "
          >
            <path d="M1.992 6.448c.337-.668.898-1.783 1.227-2.448.13-.261.378-.415.669-.441 1.367-.125 4.243-.339 5.429-.417.547-.036.951.045 1.301.397l2.786 2.8c.251.252.392.593.391.948l-.005 9.035 2.946 2.465 2.719-2.996c.591-.65 1.662-.435 1.942.399.938 2.817 2.603 7.81 2.603 7.81h-12l4.063-4.472-6.059-5.071-1.749-1.464 1.96 3.557c.104.188.164.396.178.608l.396 6.045c.022.354-.223.797-.787.797-.368 0-.687-.253-.77-.611-.309-1.323-1.025-4.399-1.206-5.178-.028-.12-.087-.229-.17-.319-.549-.591-2.738-2.892-2.738-2.892s-2.804 6.666-3.561 8.525c-.113.277-.374.475-.748.475-.462 0-.809-.382-.809-.803 0-.146 1.745-8.569 2.322-11.638.07-.371.239-.717.49-1l1.08-1.217-3.503-2.932c-.507-.425.137-1.192.642-.767l.961.805zm6.854 5.735l1.8 1.507 1.952 1.634-1.061-5.948-2.691 2.807zm-5.961-4.988l1.671 1.398 2.791-3.146-2.73-.183-1.732 1.931zm11.653-7.195c1.35 0 2.446 1.096 2.446 2.446s-1.096 2.445-2.446 2.445c-1.349 0-2.446-1.095-2.446-2.445 0-1.35 1.097-2.446 2.446-2.446z"/>
          </svg>
        </div>
      </ng-template>

      <div class="p-5">
        <p class="border-l-4 border-l-secondary pl-2 font-light">
          {{ article.publishedAt | date:'yyyy-MM-dd HH:mm:ss' }}
        </p>
        <a [href]="article.url" target="_blank">
          <h5 class="mb-2 text-xl font-bold tracking-tight hover:underline">
            {{ article.title }}
          </h5>
        </a>
        <a href="#" class="block">
          <div class="badge badge-accent badge-outline">
            {{ article.source['name'] }}
          </div>
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

  errorImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.loadNotFoundImage();
    img.style.height = 'fit-content';
    img.parentElement!.style.height = '200px';
  }

  loadNotFoundImage(): string {
    return 'assets/eye-x-lined-64.png'
  }
}
