import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import * as UsersActions from './users.actions';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from '../services/users.services';
@Injectable()
export class UsersEffects {

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UsersActions.initUsers),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return UsersActions.loadUsersSuccess({ users: [] });
  //       },
  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return UsersActions.loadUsersFailure({ error });
  //       },
  //     })
  //   )
  // );

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      console.log('listner')
      if (this.localStorage.isValidToken()) {
        console.log('qqqq')
        const userId = this.localStorage.getUserIdFromToken();
        console.log(userId,'tsdgfs')
        if (userId) {
          return this.userService.getSingleUser(userId).pipe(
            map((user) => {
              console.log(user, 'user')
              return UsersActions.buildUserSessionSuccess({ user })
            }),
            catchError(() => of(UsersActions.buildUserSessionFailure())))
        } else {
          return of(UsersActions.buildUserSessionFailure())
        }

      } else {
        console.log('failed')
        return of(UsersActions.buildUserSessionFailure())
      }
    })
  ))

  constructor(private readonly actions$: Actions, private localStorage: LocalStorageService, private userService: UsersService) { }
}
