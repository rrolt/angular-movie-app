import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movie } from '../models/movies.model';
import { Favorite } from '../models/favorites.model';
import { flatMap, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private token: string;

  constructor(private db: AngularFirestore) {
    this.token = localStorage.getItem('userToken') || this.generateToken();
    localStorage.setItem('userToken', this.token);
  }

  getToken(): string {
    return this.token;
  }

  addFavorite(movie: Movie) {
    this.db
      .collection(`users/${this.token}/favorites`)
      .doc(movie.imdbID)
      .set({
        imdbID: movie.imdbID
      });
  }

  getFavorites(): Observable<Movie[]> {
    return this.db
      .collection<Favorite>(`users/${this.token}/favorites`)
      .valueChanges()
      .pipe(
        map(favorites =>
          favorites.map(favorite =>
            this.db
              .collection('movies')
              .doc<Movie>(favorite.imdbID)
              .valueChanges()
          )
        )
      )
      .pipe(flatMap(observables => combineLatest(observables)));
  }

  private generateToken() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
}
