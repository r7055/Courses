import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { courseType } from '../../models/courseType';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-course-details-dialog',
  standalone: true,
  imports: [ MatDialogModule,  MatTableModule,FormsModule],
  templateUrl: './course-details-dialog.component.html',
  styleUrl: './course-details-dialog.component.css'
})


export class CourseDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CourseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: courseType
  ) {}

  close(): void {
    console.log();
    
    this.dialogRef.close();
  }
}
