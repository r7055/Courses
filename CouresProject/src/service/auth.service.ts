// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { UserType } from '../models/userType';
// import { baseUrl } from './env';
// import { UserService } from './user.service'; // ייבוא השירות החדש

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http: HttpClient, private userService: UserService) { }

//   register(user: UserType): Observable<UserType> {
//     return this.http.post<UserType>(`${baseUrl}/auth/register`, user).pipe(
//       tap(response => {
//         console.log("after", response);
//         this.userService.setUser(response); // שמירה של פרטי המשתמש במצב גלובלי
//       }),
//       catchError(error => {
//         console.error('Error registering user:', error);
//         throw error;
//       })
//     );
//   }

//   login(email: string, password: string): Observable<{ token: string }> {
//     return this.http.post<{ token: string }>(`${baseUrl}/auth/login`, { email, password }).pipe(
//       tap(response => {
//         localStorage.setItem("authToken", response.token);
    
//         console.log("Token saved:", response.token);
//       }),
//       catchError(error => {
//         console.error('Error logging in user:', error);
//         throw error;
//       })
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserType } from '../models/userType';
import { baseUrl } from './env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ userId: number, role: string, token: string }> {
    return this.http.post<{ userId: number, role: string, token: string }>(`${baseUrl}/auth/login`, { email, password });
  }

  register(user: UserType): Observable<{ userId: number, role: string, token: string }> {
    return this.http.post<{ userId: number, role: string, token: string }>(`${baseUrl}/auth/register`, user);
  }
}