import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { CommonServices } from './common/services/common-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [CommonServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
