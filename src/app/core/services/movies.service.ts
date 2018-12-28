import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movies.model';

@Injectable()
export class MoviesService {
  private apiKey = environment.omdb.apiKey;

  private rootUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&`;

  constructor(private http: HttpClient) {}

  search(term: string): Observable<Movie[]> {
    return this.http
      .get<SearchResponse>(`${this.rootUrl}s=${term}`)
      .pipe(map(response => response.Search));
  }
}

interface SearchResponse {
  Search: Movie[];
}
