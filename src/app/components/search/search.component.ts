import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
    <div class="p-5">
      <input
        #searchField
        type="search"
        placeholder="What do you want to search?"
        (keyup.enter)="search(searchField.value)"
        [value]="searchTerm"
        class="
          input input-bordered w-full
          text-2xl font-semibold p-4
          focus:input-primary
          placeholder:italic
        "
      >
    </div>
  `,
})
export class SearchComponent implements OnInit {

  searchTerm = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const s = params['searchTerm'];
      if (!s) return;
      this.searchTerm = s;
    });
  }

  search(term: string) {
    if (!term) return;
    this.router.navigateByUrl(`/search/${term}`);
  }

}
