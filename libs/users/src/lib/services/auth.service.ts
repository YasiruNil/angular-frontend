import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../models/auth';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: LocalStorageService, private router: Router) { }

  logIn(userdata: UserData): Observable<User> {
    return this.http.post<User>('http://localhost:4000/api/v1/login', userdata)
  }
  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login'])
  }
}
