import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  public movieForm: FormGroup = new FormGroup({
    title: new FormControl(),
    year: new FormControl(),
    genre: new FormControl()
  });

  constructor() { }

  ngOnInit() {
  }

}
