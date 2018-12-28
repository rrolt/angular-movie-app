import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { FormBuilder } from '@angular/forms';
import { filter, debounceTime, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() resultsChanged = new EventEmitter<any>();

  searchForm = this.fb.group({ term: [''] });

  constructor(private moviesService: MoviesService, private fb: FormBuilder) {
    this.searchForm
      .get('term')
      .valueChanges.pipe(
        debounceTime(500),
        filter(value => value.length > 2)
      )
      .pipe(switchMap(term => this.moviesService.search(term)))
      .subscribe();
  }

  ngOnInit() {}
}
