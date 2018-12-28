import { Component, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { FormBuilder } from '@angular/forms';
import { filter, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Movie } from '../core/models/movies.model';
import { Observable } from 'rxjs';

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
      .pipe(
        debounceTime(500),
        filter(value => value.length > 2)
      )
      .pipe(
        switchMap(term => this.moviesService.search(term)),
        tap(movies => this.resultsChanged.emit(movies))
      );
  }
}
