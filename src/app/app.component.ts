import { Component } from '@angular/core';
import { Movie } from './core/models/movies.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: Movie[];

  onMoviesChange(movies: Movie[]) {
    this.movies = movies;
  }
}
