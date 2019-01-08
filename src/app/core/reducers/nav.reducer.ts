import { NavActions, NavTypes } from '../actions/nav.actions';

export function navReducer(state: string = '', action: NavActions) {
  switch (action.type) {
    case NavTypes.SELECT:
      return action.payload;

    default:
      return state;
  }
}
