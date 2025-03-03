import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserType } from '../models/userType';
import { baseUrl } from './env';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(user: UserType): Observable<UserType> {
    return this.http.post<UserType>(`${baseUrl}/auth/register`, user).pipe(
      tap(response => {
        console.log("after", response);
      }),
      catchError(error => {
        console.error('Error registering user:', error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${baseUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        // שמירה של ה-Token ב-Local Storage
        localStorage.setItem("authToken", response.token);
        console.log("Token saved:", response.token);
      }),
      catchError(error => {
        console.error('Error logging in user:', error);
        throw error;
      })
    );
  }
}
