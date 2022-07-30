import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {


  currentUser$: any;
  isAuthenticated$: any;

  constructor(private store: Store) {
    this.currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
    this.isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth));
  }

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
