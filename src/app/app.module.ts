import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { navReducer } from './core/reducers/nav.reducer';
import { searchReducer } from './core/reducers/search.reducer';
import { UserService } from './core/services/user.service';
import { MoviesModule } from './movies/movies.module';
import { NavModule } from './nav/nav.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
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
