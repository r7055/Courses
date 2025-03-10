import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { courseType } from '../../models/courseType';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatCardModule, MatGridListModule],
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})

export class LessonListComponent implements OnInit {
  courses$ = new BehaviorSubject<courseType[]>([]);
  enrolledCourses: Set<number> = new Set(); // Set to track enrolled courses

  constructor(private courseService: CourseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses$.next(courses);
    });
  }

  joinCourse(course: courseType): void {
    this.courseService.enrollInCourse(course.id).subscribe(() => {
      this.enrolledCourses.add(course.id);
      console.log(`Joined course: ${course.title}`);
    });
  }

  leaveCourse(course: courseType): void {
    this.courseService.leaveCourse(course.id).subscribe(() => {
      this.enrolledCourses.delete(course.id);
      console.log(`Left course: ${course.title}`);
    });
  }

  openCourseDetails(course: courseType): void {
    this.dialog.open(CourseDetailsDialogComponent, {
      data: course
    });
  }
}

