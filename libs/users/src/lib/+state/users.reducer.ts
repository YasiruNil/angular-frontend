import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';
export interface UserState {
  user: User,
  isAuthenticated: boolean
}

// export interface UsersState extends EntityState<UsersEntity> {
//   selectedId?: string | number; // which Users record has been selected
//   loaded: boolean; // has the Users list been loaded
//   error?: string | null; // last known error (if any)
// }

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UserState;
}



// export const usersAdapter: EntityAdapter<UsersEntity> =
//   createEntityAdapter<UsersEntity>();

export const initialUsersState: UserState = {
  user: {},
  isAuthenticated: false
}
const userReducer = createReducer(initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({ ...state, user: action.user, isAuthenticated: true })),
  on(UsersActions.buildUserSessionFailure, (state) => ({ ...state, user: {}, isAuthenticated: false }))
)

// const reducer = createReducer(
//   initialUsersState,
//   on(UsersActions.initUsers, (state) => ({
//     ...state,
//     loaded: false,
//     error: null,
//   })),
//   on(UsersActions.loadUsersSuccess, (state, { users }) =>
//     usersAdapter.setAll(users, { ...state, loaded: true })
//   ),
//   on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
// );

export function usersReducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
