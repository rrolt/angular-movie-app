import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';

import { Favorite } from '../models/favorites.model';
import { Movie } from '../models/movies.model';

@Injectable()
export class UserService {
  favorites$ = new BehaviorSubject<Movie[]>([]);

  private token: string;

  constructor(private db: AngularFirestore) {
    this.token = localStorage.getItem('userToken') || this.generateToken();

    this.getFavorites().subscribe(favorites => this.favorites$.next(favorites)); // Will be implemented in store soon
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
    const favorites$ = this.favoritesCollection().valueChanges();

    return merge(
      favorites$.pipe(
        filter(favorites => favorites.length > 0),
        map(favorites => favorites.map(fav => this.getFavoriteMovie(fav.imdbID))),
        flatMap(observables$ => combineLatest(observables$)),
        map(movies => movies.map(movie => ({ ...movie, ...{ favorite: true } })))
      ),
      favorites$.pipe(filter(favorites => favorites.length === 0)) as Observable<Movie[]>
    );
  }

  private favoritesCollection(): AngularFirestoreCollection<Favorite> {
    return this.db
      .collection('users')
      .doc(this.token)
      .collection('favorites');
  }

  private getFavoriteMovie(imdbID: string): Observable<Movie> {
    return this.db
      .collection('movies')
      .doc<Movie>(imdbID)
      .valueChanges();
  }

  private generateToken(): string {
    const token =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    localStorage.setItem('userToken', token);

    return token;
  }
}
