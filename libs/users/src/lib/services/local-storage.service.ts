import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenTypes } from '../models/auth';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static isValidToken: any;

  constructor() { }
  setItem(data: string | '') {
    localStorage.setItem('token', data)
  }
  getItem(): string | null {
    if (localStorage.getItem('token')) return localStorage.getItem('token')
    return ''
  }
  removeToken() {
    localStorage.removeItem('token')
  }
  isValidToken() {
    const token = this.getItem();
    if (token) {
      const tokenDecode: TokenTypes = jwt_decode(token);
      return this._tokenExpiration(tokenDecode?.exp || 0)
    } else {
      return false
    }
  }
  private _tokenExpiration(exp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) <= exp
  }
  getUserIdFromToken() {
    const token = this.getItem();
    if (token) {
      const tokenDecode: TokenTypes = jwt_decode(token);
      return tokenDecode.userId
    } else {
      return null
    }
  }
}
