import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MoviesService } from '../core/services/movies.service';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SearchComponent],
  providers: [MoviesService, FormBuilder]
})
export class SearchModule {}
