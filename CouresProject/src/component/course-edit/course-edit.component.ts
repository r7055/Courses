// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-course-edit',
//   standalone: true,
//   imports: [],
//   templateUrl: './course-edit.component.html',
//   styleUrl: './course-edit.component.css'
// })
// export class CourseEditComponent {

// }
// course-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { courseType } from '../../models/courseType';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
})
export class CourseEditComponent {
  constructor(
    public dialogRef: MatDialogRef<CourseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: courseType) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
