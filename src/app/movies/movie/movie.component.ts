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

  rating: number;

  constructor(private moviesService: MoviesService, private user: UserService) {}

  toggleFavorite() {
    if (this.movie.favorite) {
      this.user.deleteFavorite(this.movie).catch(err => console.log(err));
    } else {
      this.moviesService
        .create(this.movie)
        .then(() => this.user.addFavorite(this.movie))
        .catch(err => console.log(err));
    }
  }
}
