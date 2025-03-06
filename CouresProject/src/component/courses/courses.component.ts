// // import { Component, OnInit } from '@angular/core';
// // import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// // import { CourseService } from '../../service/course.service';
// // import { courseType } from '../../models/courseType';
// // import { CourseEditComponent } from '../course-edit/course-edit.component';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatTableModule } from '@angular/material/table';
// // import { CommonModule } from '@angular/common';
// // import { UserService } from '../../service/user.service';
// // import { UserType } from '../../models/userType';

// // @Component({
// //   selector: 'app-courses',
// //   standalone: true,
// //   imports: [MatTableModule, MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
// //   templateUrl: './courses.component.html',
// //   styleUrls: ['./courses.component.css'] // תיקון 'styleUrl' ל-'styleUrls'
// // })
// // export class CoursesComponent implements OnInit {
// //   courses: courseType[] = [];
// //   teacherId: number | null = null; // הוספת משתנה כדי לאחסן את ה-teacherId

// //   constructor(private courseService: CourseService, public dialog: MatDialog,private userService:UserService) { }

// //   ngOnInit(): void {
// //     this.loadCourses();
// //     this.userService.user$.subscribe((user: UserType | null) => {
// //       if (user) {
// //         this.teacherId = user.id ?? null;
// //         console.log("teacherId courses",this.teacherId);
// //          // הנחה שהמשתמש יש לו מאפיין 'id' עבור teacherId
// //       }
// //     });
// //   }

// //   loadCourses(): void {
// //     const token = localStorage.getItem("authToken");
// //     if (token) {
// //       this.courseService.getCourses().subscribe(
// //         (courses) => this.courses = courses,
// //         (error) => console.error('Error loading courses:', error)
// //       );
// //     } else {
// //       console.error('No token found');
// //     }
// //   }

// //   openDialog(course?: courseType): void {
// //     console.log("Course:", course);
    
// //     const dialogRef = this.dialog.open(CourseEditComponent, {
// //       data: course ? { ...course } : { title: '', description: '', id: null, teacherId: this.teacherId } // שימוש ב-teacherId כאן
// //     });

// //     dialogRef.afterClosed().subscribe(result => {
// //       if (result) {
// //         const token = localStorage.getItem("authToken");
// //         if (token) {
// //           if (course) {
// //             result.teacherId = course ? course.teacherId : this.teacherId;
// //             console.log("result",result,this.teacherId);
// //             console.log("course",course);
// //             this.courseService.updateCourse(course.id, result).subscribe(() => this.loadCourses());
// //           } else {
         
// //             this.courseService.createCourse(result).subscribe(() => this.loadCourses());
// //           }
// //         }
// //       }
// //     });
// //   }

// //   deleteCourse(id: number): void {
// //     const token = localStorage.getItem("authToken");
// //     if (token) {
// //       console.log("delete course",id);
      
// //       this.courseService.deleteCourse(id).subscribe(() => this.loadCourses());
// //     }
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { CourseService } from '../../service/course.service';
// import { courseType } from '../../models/courseType';
// import { UserService } from '../../service/user.service';
// import { UserType } from '../../models/userType';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';

// @Component({
//   selector: 'app-courses',
//   standalone: true,
//   imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
//   templateUrl: './courses.component.html',
//   styleUrls: ['./courses.component.css']
// })
// export class CoursesComponent implements OnInit {
//   courses: courseType[] = [];
//   teacherId: number | null = null;
//   expandedCourseId: number | null = null; // משתנה לניהול הקורס המורחב

//   constructor(private courseService: CourseService, private userService: UserService) { }

//   ngOnInit(): void {
//     this.loadCourses();
//     this.userService.user$.subscribe((user: UserType | null) => {
//       if (user) {
//         this.teacherId = user.id ?? null;
//       }
//     });
//   }

//   loadCourses(): void {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       this.courseService.getCourses().subscribe(
//         (courses) => this.courses = courses,
//         (error) => console.error('Error loading courses:', error)
//       );
//     } else {
//       console.error('No token found');
//     }
//   }

//   toggleCourseDetails(courseId: number): void {
//     this.expandedCourseId = this.expandedCourseId === courseId ? null : courseId; // משנה את מצב ההצגה
//   }
// }
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../service/course.service';
import { courseType } from '../../models/courseType';
import { UserService } from '../../service/user.service';
import { UserType } from '../../models/userType';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CourseEditComponent } from '../course-edit/course-edit.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: courseType[] = [];
  teacherId: number | null = null;
  expandedCourseId: number | null = null; // משתנה לניהול הקורס המורחב

  constructor(private courseService: CourseService, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCourses();
    this.userService.user$.subscribe((user: UserType | null) => {
      if (user) {
        this.teacherId = user.id ?? null;
      }
    });
  }

  loadCourses(): void {
    const token = localStorage.getItem("authToken");
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
      data: course ? { ...course } : { title: '', description: '', id: null, teacherId: this.teacherId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const token = localStorage.getItem("authToken");
        if (token) {
          if (course) {
            result.teacherId = course.teacherId;
            this.courseService.updateCourse(course.id, result).subscribe(() => this.loadCourses());
          } else {
            this.courseService.createCourse(result).subscribe(() => this.loadCourses());
          }
        }
      }
    });
  }

  deleteCourse(id: number): void {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.courseService.deleteCourse(id).subscribe(() => this.loadCourses());
    }
  }

  toggleCourseDetails(courseId: number): void {
    this.expandedCourseId = this.expandedCourseId === courseId ? null : courseId; // משנה את מצב ההצגה
  }
}
