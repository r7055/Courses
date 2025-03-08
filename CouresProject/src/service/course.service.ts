// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { baseUrl } from './env';
// import { courseType } from '../models/courseType';
// import { LessonService } from './lesson.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseService {

//   constructor(private http: HttpClient,lessonService :LessonService) { }

//   private getHeaders(): HttpHeaders {
//     // קריאה ל-Token מה-Local Storage
//     const token = localStorage.getItem("authToken");
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   getCourses(): Observable<courseType[]> {
//     return this.http.get<courseType[]>(`${baseUrl}/courses`, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   getCourseById(id: number): Observable<courseType> {
//     return this.http.get<courseType>(`${baseUrl}/courses/${id}`, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   createCourse(course: courseType): Observable<courseType> {
//     console.log("create", course, this.getHeaders());
//     return this.http.post<courseType>(`${baseUrl}/courses`, course, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   updateCourse(id: number, course: courseType): Observable<courseType> {
//     const headers = this.getHeaders(); // קבל את הכותרות הנדרשות
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`); // הוסף את ה-Token לכותרת
//     }
   
    
//     return this.http.put<courseType>(`${baseUrl}/courses/${id}`, course, { headers: headers })
//       .pipe(catchError(this.handleError));
//   }

//   deleteCourse(id: number): Observable<void> {
//     const headers = this.getHeaders(); // קבל את הכותרות הנדרשות
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`); // הוסף את ה-Token לכותרת
//     }

//     return this.http.delete<void>(`${baseUrl}/courses/${id}`, { headers: headers })
//       .pipe(catchError(this.handleError));
//   }


//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred', error);
//     return throwError(error);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { baseUrl } from './env';
import { courseType } from '../models/courseType';
import { LessonService } from './lesson.service';
import { lessonType } from '../models/lessonType'; // Import lessonType

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private lessonService: LessonService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCourses(): Observable<courseType[]> {
    return this.http.get<courseType[]>(`${baseUrl}/courses`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCourseById(id: number): Observable<courseType> {
    return this.http.get<courseType>(`${baseUrl}/courses/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createCourse(course: courseType, lessons: lessonType[]): Observable<courseType> {
    return this.http.post<courseType>(`${baseUrl}/courses`, course, { headers: this.getHeaders() })
      .pipe(
        switchMap(createdCourse => {
          // שמירת השיעורים לאחר שהקורס נוצר
          const lessonRequests = lessons.map(lesson => this.lessonService.createLesson(createdCourse.id, lesson));
          return forkJoin(lessonRequests).pipe(
            map(() => createdCourse) // מחזירים את הקורס שנוצר
          );
        }),
        catchError(this.handleError)
      );
  }

  updateCourse(id: number, course: courseType, lessons: lessonType[]): Observable<courseType> {
    return this.http.put<courseType>(`${baseUrl}/courses/${id}`, course, { headers: this.getHeaders() })
      .pipe(
        switchMap(updatedCourse => {
          // עדכון השיעורים לאחר שהקורס עודכן
          const lessonRequests = lessons.map(lesson => this.lessonService.updateLesson(updatedCourse.id, lesson.id, lesson));
          return forkJoin(lessonRequests).pipe(
            map(() => updatedCourse) // מחזירים את הקורס המעודכן
          );
        }),
        catchError(this.handleError)
      );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/courses/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
