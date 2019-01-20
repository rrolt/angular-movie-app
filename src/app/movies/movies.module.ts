import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BarRatingModule } from 'ngx-bar-rating';

import { MovieComponent } from './movie/movie.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

@NgModule({
  declarations: [MoviesListComponent, MovieComponent],
  imports: [CommonModule, MatIconModule, BarRatingModule],
  exports: [MoviesListComponent, MovieComponent]
})
export class MoviesModule {}
