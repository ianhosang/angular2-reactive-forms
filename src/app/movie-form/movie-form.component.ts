import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  public movieForm: FormGroup = new FormGroup({
    title: new FormControl(),
    year: new FormControl(),
    genre: new FormControl(),
    mainStar: new FormControl()
  });

  /**
   * this observable simulates an HTTP request
   */
  public stars: Observable<{id: number, name: string, searchText: string}[]> = new Observable(observer => {
    observer.next([
      {
        id: 1,
        name: "Clint Eastwood",
        searchText: "clint eastwood"
      },
      {
        id: 2,
        name: "Uma Thurman",
        searchText: "uma thurman"
      },
      {
        id: 3,
        name: "David Caradine",
        searchText: "david caradine"
      },
      {
        id: 4,
        name: "Christian Bale",
        searchText: "christian bale"
      },
      {
        id: 5,
        name: "Daniel Isaac Geslin",
        searchText: "daniel isaac geslin"
      }
    ]);
    observer.complete();
  });

  constructor() { }

  public selectMainStar(star) {
    this.movieForm.value.mainStar = star && star.name;
  }

}
