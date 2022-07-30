import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';
import { UsersEntity } from './users.models';


export const buildUserSession = createAction('[Users] Build user session');

export const initUsers = createAction('[Users Page] Init');

export const buildUserSessionSuccess = createAction(
  '[Users] Build user session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailure = createAction(
  '[Users] Build user session Failure',

);
