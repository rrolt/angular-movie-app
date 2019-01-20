import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

import { Update } from '../core/actions/search.actions';
import { Movie } from '../core/models/movies.model';
import { AppState } from '../core/models/state.model';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  term = new FormControl();

  minValueLength = 3;

  autoFocus = true;

  constructor(private store: Store<AppState>, private moviesService: MoviesService) {
    this.results().subscribe();
  }

  private results(): Observable<Movie[]> {
    const source$ = this.term.valueChanges;

    const empty$ = source$.pipe(
      filter(value => value.length < this.minValueLength),
      map(() => [])
    );

    const search$ = source$.pipe(
      filter(value => value.length >= this.minValueLength),
      debounceTime(200),
      switchMap(term => this.moviesService.search(term))
    );

    return merge(empty$, search$).pipe(tap(results => this.store.dispatch(new Update(results))));
  }
}
