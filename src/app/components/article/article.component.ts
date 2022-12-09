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
}
