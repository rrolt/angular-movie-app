import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../core/services/movies.service';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  exports: [SearchComponent],
  providers: [MoviesService]
})
export class SearchModule {}
