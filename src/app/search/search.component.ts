import { Component } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { switchMap, tap, debounce } from 'rxjs/operators';
import { Movie } from '../core/models/movies.model';
import { Observable, timer, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Update } from '../core/actions/search.actions';
import { AppState } from '../core/models/state.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm = this.fb.group({ term: [''] });
  minValueLength = 2;

  constructor(
    private store: Store<AppState>,
    private moviesService: MoviesService,
    private fb: FormBuilder
  ) {
    this.results().subscribe();
  }

  private results(): Observable<Movie[]> {
    return this.searchForm.controls.term.valueChanges
      .pipe(
        debounce(value =>
          value.length > this.minValueLength ? timer(200) : timer(0)
        )
      )
      .pipe(
        switchMap(term =>
          term.length > this.minValueLength
            ? this.moviesService.search(term)
            : of([])
        ),
        tap(results => this.store.dispatch(new Update(results)))
      );
  }
}
