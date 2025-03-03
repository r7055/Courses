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
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { courseType } from '../../models/courseType';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatDialogModule,
     MatCardModule, MatIconModule, MatInputModule,MatButtonModule,
 ],
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent {
  constructor(
    public dialogRef: MatDialogRef<CourseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: courseType) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
