import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Typeahead } from './type-ahead/typeahead.component';
import { InputBooleanComponent } from './input-boolean/input-boolean.component';

import { AppComponent } from './app.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieFormService } from './movie-form.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieFormComponent,
    Typeahead,
    InputBooleanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [MovieFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
