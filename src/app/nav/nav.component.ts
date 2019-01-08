import { Component } from '@angular/core';
import { AppState } from '../core/models/state.model';
import { Store } from '@ngrx/store';
import { Select } from '../core/actions/nav.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private store: Store<AppState>) {}

  select(nav: string) {
    this.store.dispatch(new Select(nav));
  }
}
