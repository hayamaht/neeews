import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '~app/app-routing.module';
import { AppComponent } from '~app/app.component';
import { NewsApiInterceptor } from '~app/new-api.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
