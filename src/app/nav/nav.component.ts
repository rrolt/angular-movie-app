import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Select } from '../core/actions/nav.actions';
import { AppState } from '../core/models/state.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  currentNav: string;

  constructor(private store: Store<AppState>) {}

  select(nav: string) {
    this.currentNav = this.currentNav === nav ? null : nav;
    this.store.dispatch(new Select(this.currentNav));
  }
}
