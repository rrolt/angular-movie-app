import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [MoviesListComponent, MovieComponent],
  imports: [CommonModule, MatIconModule],
  exports: [MoviesListComponent, MovieComponent]
})
export class MoviesModule {}
