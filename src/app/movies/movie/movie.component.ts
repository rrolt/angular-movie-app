import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  @Input() movie: Movie;
  favorite = false;

  constructor() {}
}
