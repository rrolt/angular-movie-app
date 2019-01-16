import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.model';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  @Input() movie: Movie;
  @Input() favorite: boolean;

  constructor(private moviesService: MoviesService, private user: UserService) {}

  toggleFavorite(movie: Movie) {
    if (this.favorite) {
      this.user.deleteFavorite(movie).catch(err => console.log(err));
    } else {
      this.moviesService
        .create(movie)
        .then(() => this.user.addFavorite(movie))
        .catch(err => console.log(err));
    }
  }
}
