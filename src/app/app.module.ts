import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieFormService } from './movie-form.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [MovieFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
