import { Action } from '@ngrx/store';

export const enum NavTypes {
  SELECT = '[Nav] Select'
}

export class Select implements Action {
  readonly type = NavTypes.SELECT;

  constructor(public payload: string) {}
}

export type NavActions = Select;
