import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseService } from '../../service/course.service';
import { courseType } from '../../models/courseType';
import { CourseEditComponent } from '../course-edit/course-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class CoursesComponent implements OnInit {
  courses: courseType[] = [];

  constructor(private courseService: CourseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (token) {
      this.courseService.getCourses().subscribe(
        (courses) => this.courses = courses,
        (error) => console.error('Error loading courses:', error)
      );
    } else {
      console.error('No token found');
    }
  }

  openDialog(course?: courseType): void {
    const dialogRef = this.dialog.open(CourseEditComponent, {
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const token = localStorage.getItem("authToken"); // Retrieve the token again
        if (token) {
          if (course) {
            this.courseService.updateCourse(course.id, result).subscribe(() => this.loadCourses());
          } else {
            this.courseService.createCourse(result).subscribe(() => this.loadCourses());
          }
        }
      }
    });
  }

  deleteCourse(id: number): void {
    const token = localStorage.getItem("authToken"); // Retrieve the token again
    if (token) {
      this.courseService.deleteCourse(id).subscribe(() => this.loadCourses());
    }
  }
}
