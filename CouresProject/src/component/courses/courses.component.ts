
// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { courseType } from '../../models/courseType';
// import { CourseService } from '../../service/course.service';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { CourseEditComponent } from '../course-edit/course-edit.component';
// import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';

// @Component({
//   selector: 'app-courses',
//   standalone: true,
//   imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
//   templateUrl: './courses.component.html',
//   styleUrls: ['./courses.component.css']
// })
// export class CoursesComponent implements OnInit {
//   courses: courseType[] = [];

//   constructor(private courseService: CourseService, public dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses(): void {
//     this.courseService.getCourses().subscribe(courses => {
//       this.courses = courses;
//     });
//   }

//   openDialog(course?: courseType): void {
//     const dialogRef = this.dialog.open(CourseEditComponent, {
//       data: course || { lessons: [] } // אם אין קורס, ניצור אובייקט חדש
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (result.id) {
//           // אם קיים מזהה, נעדכן את הקורס
//           this.courseService.updateCourse(result.id, result, result.lessons).subscribe(() => {
//             this.loadCourses();
//           });
//         } else {
//           // אם אין מזהה, ניצור קורס חדש
//           this.courseService.createCourse(result, result.lessons).subscribe(() => {
//             this.loadCourses();
//           });
//         }
//       }
//     });
//   }

//   openCourseDetails(course: courseType): void {
//     const dialogRef = this.dialog.open(CourseDetailsDialogComponent, {
//       data: course
//     });
//   }
  
//   deleteCourse(id: number): void {
//     this.courseService.deleteCourse(id).subscribe(() => {
//       this.loadCourses();
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { courseType } from '../../models/courseType';
import { CourseService } from '../../service/course.service';
import { LessonService } from '../../service/lesson.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CourseEditComponent } from '../course-edit/course-edit.component';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: courseType[] = [];
  
  constructor(private courseService: CourseService, private lessonService: LessonService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.courses.forEach(course => this.loadLessons(course.id));
    });
  }

  loadLessons(courseId: number): void {
    this.lessonService.getLessons(courseId).subscribe(lessons => {
      const course = this.courses.find(c => c.id === courseId);
      if (course) {
        course.lessons = lessons; // Update the lessons of the course
      }
    });
  }

  openDialog(course?: courseType): void {
    const dialogRef = this.dialog.open(CourseEditComponent, {
      data: course || { lessons: [] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.courseService.updateCourse(result.id, result, result.lessons).subscribe(() => {
            this.loadCourses();
          });
        } else {
          this.courseService.createCourse(result, result.lessons).subscribe(() => {
            this.loadCourses();
          });
        }
      }
    });
  }

  openCourseDetails(course: courseType): void {
    const dialogRef = this.dialog.open(CourseDetailsDialogComponent, {
      data: course
    });
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }
}
