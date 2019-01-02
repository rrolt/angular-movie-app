import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [MoviesListComponent, MovieComponent],
  imports: [CommonModule],
  exports: [MoviesListComponent, MovieComponent]
})
export class MoviesModule {}
