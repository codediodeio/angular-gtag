import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { GoogleAnalyticsModule } from 'angular-gtag';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleAnalyticsModule.forRoot({trackingId: 'UA-59099331-15'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
