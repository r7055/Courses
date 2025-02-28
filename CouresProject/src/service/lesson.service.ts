import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lessonType } from '../models/lessonType';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './env';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonsSubject=new BehaviorSubject<lessonType[]>([])
  lessons$ =this.lessonsSubject.asObservable()
  constructor(private http:HttpClient) { }

  getLessons(courseId:number)
  {
    this.http.get(`${baseUrl}/courses/${courseId}/lessons`).subscribe(lessons=>this.lessons$)
  }
  
}
