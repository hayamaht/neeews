import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '~app/pages/home/home.page';

const routes: Routes = [{
  path: '', component: HomePage
}, {
  path: 'search/:searchTerm', component: HomePage
}, {
  path: '**', redirectTo: '/'
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
