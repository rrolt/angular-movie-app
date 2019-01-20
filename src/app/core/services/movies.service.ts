import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Movie } from '../models/movies.model';

@Injectable()
export class MoviesService {
  private searchUrl = `http://www.omdbapi.com/?apikey=${environment.omdb.apiKey}`;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  search(term: string): Observable<Movie[]> {
    return this.http
      .get<SearchResponse>(`${this.searchUrl}&s=${term}`)
      .pipe(map(response => response.Search));
  }

  create(movie: Movie): Promise<void> {
    return this.db
      .collection('movies')
      .doc(movie.imdbID)
      .set(movie);
  }
}

interface SearchResponse {
  Search: Movie[];
}
