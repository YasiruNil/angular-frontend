import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../+state/users.facade';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient, private userFacade: UsersFacade) {

    }
    getUserss(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:4000/api/v1/users');
    }
    getSingleUser(userId: string): Observable<User> {
        return this.http.get<User>(`http://localhost:4000/api/v1/user/${userId}`);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:4000/api/v1/user`, user);
    }
    deleteUser(userId: string): Observable<Object> {
        return this.http.delete<Object>(`http://localhost:4000/api/v1/user/${userId}`);
    }
    updateUser(user: User, userId: string): Observable<User> {
        return this.http.put<User>(`http://localhost:4000/api/v1/user/${userId}`, user);
    }
    getCountry(countryKey?: any): string {
        return countriesLib.getName(countryKey, 'en')

    }
    getUserCount(): any {
        return this.http.get<any>(`http://localhost:4000/api/v1/user/count`);
    }
    initAppSession() {
        this.userFacade.buildUserSession();
    }
    observeCurrentUser() {
        console.log(this.userFacade.currentUser$,'this.userFacade.currentUser$')
        return this.userFacade.currentUser$;
    }
    isCurrentUserAuth() {
        return this.userFacade.isAuthenticated$;
    }

}
