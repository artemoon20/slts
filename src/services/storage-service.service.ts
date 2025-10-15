import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';

  constructor() { }

  setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken() {  
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  removeAccessToken() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }
}
