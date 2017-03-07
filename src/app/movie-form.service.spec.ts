/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieFormService } from './movie-form.service';

describe('Service: MovieForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieFormService]
    });
  });

  it('should ...', inject([MovieFormService], (service: MovieFormService) => {
    expect(service).toBeTruthy();
  }));
});
