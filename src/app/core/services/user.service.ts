import { Injectable } from '@angular/core';
import { Movie } from '../models/movies.model';
import { Favorite } from '../models/favorites.model';
import { flatMap, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class UserService {
  private token: string;

  constructor(private db: AngularFirestore) {
    this.token = localStorage.getItem('userToken') || this.generateToken();
    localStorage.setItem('userToken', this.token);
  }

  addFavorite(movie: Movie): Promise<void> {
    return this.favoritesCollection()
      .doc(movie.imdbID)
      .set({
        imdbID: movie.imdbID
      });
  }

  deleteFavorite(movie: Movie): Promise<void> {
    return this.favoritesCollection()
      .doc(movie.imdbID)
      .delete();
  }

  getFavorites(): Observable<Movie[]> {
    return this.favoritesCollection()
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

  private favoritesCollection(): AngularFirestoreCollection<Favorite> {
    return this.db
      .collection('users')
      .doc(this.token)
      .collection('favorites');
  }

  private generateToken(): string {
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
