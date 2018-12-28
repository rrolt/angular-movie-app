import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesService {
  private apiKey = environment.omdb.apiKey;

  private rootUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&`;

  constructor(private http: HttpClient) {}

  search(term: string): Observable<any> {
    return this.http.get(`${this.rootUrl}s=${term}`);
  }
}
