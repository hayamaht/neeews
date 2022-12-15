import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '~app/pages/home/home.page';
import { TopHeadlinesPage } from '~app/pages/top-headlines/top-headlines.page';

const routes: Routes = [{
  path: '', component: HomePage
}, {
  path: 'top-headlines', component: TopHeadlinesPage
}, {
  path: 'top-headlines/:category', component: TopHeadlinesPage
}, {
  path: 'search/:searchTerm', component: HomePage
}, {
  path: '**', redirectTo: '/top-headlines'
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
