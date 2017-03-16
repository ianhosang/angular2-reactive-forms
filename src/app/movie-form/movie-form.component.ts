import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  private readonly minToSuggest: number = 0;
  public movieForm: FormGroup = new FormGroup({
    title: new FormControl(),
    year: new FormControl(),
    genre: new FormControl(),
    mainStar: new FormControl(),
    foreign: new FormControl()
  });

  public stars: any[] = [];
  public defaultValue: any;

  constructor() { }

  ngOnInit() {
    /** http service getting defaults */
    setTimeout(() => {
      this.defaultValue = {
        id: 1,
        name: 'clint eastwood',
        searchText: 'clint eastwood'
      };
    }, 500);
    
  }

  public getStars(value: string) {
    if (value.length < this.minToSuggest) return;
    /* http service */
    setTimeout(() => {
      this.stars = [
        {
          id: 1,
          name: 'clint eastwood',
          searchText: 'clint eastwood'
        },
        {
          id: 2,
          name: Math.random().toString(), //just to prove it's updating itself
          searchText: 'uma thurman'
        },
        {
          id: 3,
          name: Math.random().toString(), //just to prove it's updating itself
          searchText: 'david caradine'
        },
        {
          id: 4,
          name: Math.random().toString(), //just to prove it's updating itself
          searchText: 'christian bale'
        },
        {
          id: 5,
          name: Math.random().toString(), //just to prove it's updating itself
          searchText: 'daniel isaac geslin'
        }
      ]
    }, 500);
  }

  public selectMainStar(star) {
    this.movieForm.value.mainStar = star && star.name;
  }

}
