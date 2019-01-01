import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './search/search.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatGridListModule } from '@angular/material';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';

import { StoreModule } from '@ngrx/store';
import { searchReducer } from './core/reducers/search.reducer';

@NgModule({
  declarations: [AppComponent, MoviesListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    SearchModule,
    StoreModule.forRoot({ search: searchReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
