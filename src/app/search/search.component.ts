import { Component } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { switchMap, tap, debounce } from 'rxjs/operators';
import { Movie } from '../core/models/movies.model';
import { Observable, timer, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Update } from '../core/actions/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm = this.fb.group({ term: [''] });

  constructor(
    private store: Store<{ search: Movie[] }>,
    private moviesService: MoviesService,
    private fb: FormBuilder
  ) {
    this.results().subscribe();
  }

  private results(): Observable<Movie[]> {
    return this.searchForm.controls.term.valueChanges
      .pipe(debounce(value => (value.length > 2 ? timer(200) : timer(0))))
      .pipe(
        switchMap(term =>
          term.length > 2 ? this.moviesService.search(term) : of([])
        ),
        tap(results => this.store.dispatch(new Update(results)))
      );
  }
}
