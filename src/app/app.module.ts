import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CheckoutService } from './services/checkout.service';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { ErrorPageComponent } from './home/error-page/error-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TimelineModule } from 'primeng/timeline';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    TimelineModule,
  ],
  providers: [CheckoutService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
