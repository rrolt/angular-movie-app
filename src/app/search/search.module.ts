import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from '../core/services/movies.service';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SearchComponent],
  providers: [MoviesService, FormBuilder]
})
export class SearchModule {}
