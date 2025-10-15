import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpResponse, SignInResponse } from '../models/auth-responses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string, role: string, status: string, first_name: string): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/auth/sign-up`, { email, password, role, status, first_name });
  }

  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/auth/sign-in`, { email, password });
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
