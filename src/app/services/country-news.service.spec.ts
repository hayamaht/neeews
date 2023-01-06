import { TestBed } from '@angular/core/testing';

import { CountryNewsService } from './country-news.service';

describe('CountryNewsService', () => {
  let service: CountryNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
