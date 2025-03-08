import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { courseType } from '../../models/courseType';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent {
  newLessonTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<CourseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: courseType) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addLesson(): void {
    if (this.newLessonTitle) {
      if (!this.data.lessons) {
        this.data.lessons = []; // אם אין רשימה, ניצור אחת חדשה
      }
      this.data.lessons.push(this.newLessonTitle);
      this.newLessonTitle = ''; 
    }
  }
}
// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { courseType } from '../../models/courseType';
// import { LessonService } from '../../service/lesson.service'; // הוספת השירות
// import { lessonType } from '../../models/lessonType';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';

// @Component({
//   selector: 'app-course-edit',
//   standalone: true,
//   imports: [
//         CommonModule,
//         MatFormFieldModule,
//         FormsModule,
//         MatCardModule,
//         MatIconModule,
//         MatInputModule,
//         MatButtonModule,
//         MatDialogModule
//       ],
//   templateUrl: './course-edit.component.html',
//   styleUrls: ['./course-edit.component.css']
// })
// export class CourseEditComponent {
//   newLessonTitle: string = '';
//   newLesson: lessonType = {
//     title: '', content: '', courseId: this.data.id,
//     id: 0
//   }; // הוספת אובייקט שיעור חדש

//   constructor(
//     public dialogRef: MatDialogRef<CourseEditComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: courseType,
//     private lessonService: LessonService // הוספת השירות
//   ) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   addLesson(): void {
//     if (this.newLesson.title && this.newLesson.content) {
//       this.lessonService.createLesson(this.data.id, this.newLesson).subscribe(() => {
//         this.newLesson = { title: '', content: '', courseId: this.data.id, id: 0 }; // לאפס את השיעור החדש
//         console.log('Lesson added');
//       });
//     }
//   }
// }
