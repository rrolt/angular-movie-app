import { Component } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/models/state.model';
import {
  trigger,
  transition,
  stagger,
  animate,
  style,
  query,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('50ms', [
            animate(
              '.3s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class MoviesListComponent {
  movies$: Observable<Movie[]>;

  constructor(private store: Store<AppState>) {
    this.movies$ = this.store.pipe(select('search'));
  }
}
