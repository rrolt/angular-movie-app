import { Component } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.model';
import { Store } from '@ngrx/store';
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
import { UserService } from 'src/app/core/services/user.service';
import { Favorite } from 'src/app/core/models/favorites.model';

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

  favorites: Favorite[] = [];

  constructor(private store: Store<AppState>, private user: UserService) {
    this.movies$ = this.store.select('search');

    this.user
      .getFavorites()
      .subscribe(favorites => (this.favorites = favorites));
  }

  isFavorite(movie: Movie): boolean {
    if (this.favorites.find(favorite => favorite.imdbID === movie.imdbID)) {
      return true;
    } else {
      return false;
    }
  }
}
