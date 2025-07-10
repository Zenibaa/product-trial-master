import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/loginRequest.model';
import { User } from '../models/user.model';

const AUTH_API = 'http://localhost:8081/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUser = signal<User | null>(null);

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${AUTH_API}/token`, loginRequest).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);

          // Stocker les informations utilisateur
          const user: User = {
            id: response.id,
            username: response.username,
            firstname: response.firstname || '',
            email: response.email,
            role: response.role || 'USER',
            createdAt: Date.now(),
            updatedAt: Date.now()
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.set(user);

          console.log('User logged in:', user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    if (this.currentUser()) {
      return this.currentUser();
    }

    // Essayer de récupérer depuis localStorage
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUser.set(user);
        return user;
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        return null;
      }
    }

    return null;
  }

  getUserSignal() {
    return this.currentUser.asReadonly();
  }

}
