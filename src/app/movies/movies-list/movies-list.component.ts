import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private store: Store<{ search: Movie[] }>) {
    this.movies$ = this.store.pipe(select('search'));
  }

  ngOnInit() {}
}
