import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.model';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  @Input() movie: Movie;
  favorite = false;

  constructor(private moviesService: MoviesService) {}

  fav(movie: Movie) {
    this.favorite = true;

    this.moviesService
      .create(movie)
      .then(() => this.moviesService.addToFavorites(movie))
      .catch(() => (this.favorite = false));
  }
}
