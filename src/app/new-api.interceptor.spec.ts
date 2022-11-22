import { TestBed } from '@angular/core/testing';

import { NewsApiInterceptor } from '~app/new-api.interceptor';

describe('NewApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NewsApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NewApiInterceptor = TestBed.inject(NewsApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
