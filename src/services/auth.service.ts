import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpResponse, SignInResponse } from '../models/auth-responses';
import { Router } from '@angular/router';

type signUpPayload = {
  email: string;
  password: string;
  firstName: string;
  organizationName: string;
};

type signInPayload = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signUp(formPayload: signUpPayload): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/auth/sign-up`, formPayload);
  }

  signIn(formPayload: signInPayload): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/auth/sign-in`, formPayload);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');

    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  logout(): void {
    localStorage.removeItem('jwt');

    this.router.navigate(['/sign-in']);
  }
}
