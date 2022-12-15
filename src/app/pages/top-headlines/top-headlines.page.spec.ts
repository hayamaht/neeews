import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeadlinesPage } from './top-headlines.page';

describe('TopHeadlinesPage', () => {
  let component: TopHeadlinesPage;
  let fixture: ComponentFixture<TopHeadlinesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeadlinesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHeadlinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
