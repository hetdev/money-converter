import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {ConverterService} from './shared/converter.service';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ConverterService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
