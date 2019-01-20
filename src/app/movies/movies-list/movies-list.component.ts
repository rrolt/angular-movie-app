import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movies.model';
import { AppState } from 'src/app/core/models/state.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
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

  constructor(private store: Store<AppState>, private user: UserService) {
    this.store
      .select('nav')
      .subscribe(
        nav =>
          (this.movies$ = nav === 'favorite' ? this.user.favorites$ : this.getMoviesFromSearch())
      );
  }

  private getMoviesFromSearch(): Observable<Movie[]> {
    return combineLatest(this.store.select('search'), this.user.favorites$, (movies, favorites) =>
      movies.map(movie => {
        movie.favorite = favorites.find(fav => fav.imdbID === movie.imdbID) ? true : false;
        return movie;
      })
    );
  }
}
