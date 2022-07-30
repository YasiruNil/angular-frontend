import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode';
import { TokenTypes } from '../models/auth';
@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private localService: LocalStorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localService.getItem();
    if (token) {
      const tokenDecode: TokenTypes = jwt_decode(token);
      if (tokenDecode?.isAdmin && !this._tokenExpiration(tokenDecode?.exp || 0)) return true;
    };
    this.router.navigate(['/login']);
    return false;
  }
  private _tokenExpiration(exp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= exp
  }

}
