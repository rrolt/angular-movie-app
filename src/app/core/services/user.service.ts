import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movie } from '../models/movies.model';

@Injectable()
export class UserService {
  private token: string;

  constructor(private db: AngularFirestore) {
    this.token = localStorage.getItem('userToken') || this.generateToken();
    localStorage.setItem('userToken', this.token);
  }

  getToken() {
    return this.token;
  }

  addFavorite(movie: Movie) {
    return this.db.collection('favorites').add({
      userToken: this.token,
      imdbID: movie.imdbID
    });
  }

  getFavorites() {
    return this.db
      .collection('favorites', ref => ref.where('userToken', '==', this.token))
      .valueChanges();
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
