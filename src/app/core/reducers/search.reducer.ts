import { SearchActions, SearchTypes } from '../actions/search.actions';
import { Movie } from '../models/movies.model';

export function searchReducer(state: Movie[] = [], action: SearchActions) {
  switch (action.type) {
    case SearchTypes.UPDATE:
      return action.payload;

    default:
      return state;
  }
}
