import { Action } from '@ngrx/store';
import { Movie } from '../models/movies.model';

export const enum SearchTypes {
  UPDATE = '[Search] Update'
}

export class Update implements Action {
  readonly type = SearchTypes.UPDATE;

  constructor(public payload: Movie[]) {}
}

export type SearchActions = Update;
