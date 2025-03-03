import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserType } from '../models/userType';
import { baseUrl } from './env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // אתחול BehaviorSubject עם מערך ריק
  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(token: string): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${baseUrl}/users`, { headers: this.createAuthorizationHeader(token) }).pipe(
      catchError(error => this.handleError(error, 'fetching users'))
    );
  }

  getUserById(id: number, token: string): Observable<UserType> {
    return this.http.get<UserType>(`${baseUrl}/users/${id}`, { headers: this.createAuthorizationHeader(token) }).pipe(
      catchError(error => this.handleError(error, `fetching user with id ${id}`))
    );
  }

  updateUserDetails(id: number, user: UserType, token: string): Observable<UserType> {
    return this.http.put<UserType>(`${baseUrl}/users/${id}`, user, { headers: this.createAuthorizationHeader(token) }).pipe(
      catchError(error => this.handleError(error, `updating user with id ${id}`))
    );
  }

  deleteById(id: number, token: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/users/${id}`, { headers: this.createAuthorizationHeader(token) }).pipe(
      catchError(error => this.handleError(error, `deleting user with id ${id}`))
    );
  }

  private handleError(error: any, operation: string) {
    console.error(`Error ${operation}:`, error);
    // ניתן להחזיר הודעת שגיאה ידידותית למשתמש או Observable עם שגיאה ספציפית
    return throwError('משהו השתבש; בבקשה נסה שוב מאוחר יותר.');
  }
}
