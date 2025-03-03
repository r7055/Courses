import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from './env';
import { courseType } from '../models/courseType';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    // קריאה ל-Token מה-Local Storage
    const token = localStorage.getItem("authToken");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCourses(): Observable<courseType[]> {
    return this.http.get<courseType[]>(baseUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCourseTypeById(id: number): Observable<courseType> {
    return this.http.get<courseType>(`${baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createCourse(course: courseType): Observable<courseType> {
    return this.http.post<courseType>(baseUrl, course, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateCourse(id: number, course: courseType): Observable<courseType> {
    return this.http.put<courseType>(`${baseUrl}/${id}`, course, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
