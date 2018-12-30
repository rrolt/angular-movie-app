import { Component, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { switchMap, tap, debounce } from 'rxjs/operators';
import { Movie } from '../core/models/movies.model';
import { Observable, timer, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() resultsChanged = new EventEmitter<Movie[]>();

  searchForm = this.fb.group({ term: [''] });

  constructor(private moviesService: MoviesService, private fb: FormBuilder) {
    this.results().subscribe();
  }

  private results(): Observable<Movie[]> {
    return this.searchForm.controls.term.valueChanges
      .pipe(debounce(value => (value.length > 2 ? timer(200) : timer(0))))
      .pipe(
        switchMap(term =>
          term.length > 2 ? this.moviesService.search(term) : of([])
        ),
        tap(movies => this.resultsChanged.emit(movies))
      );
  }
}
