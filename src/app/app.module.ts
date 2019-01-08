import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './search/search.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatGridListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './core/reducers/search.reducer';
import { MoviesModule } from './movies/movies.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserService } from './core/services/user.service';
import { NavModule } from './nav/nav.module';
import { navReducer } from './core/reducers/nav.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    SearchModule,
    NavModule,
    MoviesModule,
    StoreModule.forRoot({ search: searchReducer, nav: navReducer }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
