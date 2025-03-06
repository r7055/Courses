import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { CourseService } from '../service/course.service'; // Import the CourseService
import { courseType } from '../models/courseType'; // Import courseType

@Directive({
  standalone: true,
  selector: '[appCourseDisplay]'
})
export class CourseDisplayDirective {
  @Input() set appCourseDisplay(courseId: number) {
    if (courseId) {
      this.loadCourse(courseId);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private courseService: CourseService) {}

  private loadCourse(courseId: number) {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.courseService.getCourseById(courseId).subscribe((course: courseType) => {
        this.renderCourse(course);
      }, error => {
        console.error('Error loading course:', error);
      });
    }
  }

  private renderCourse(course: courseType) {
    const card = this.renderer.createElement('mat-card');
    const title = this.renderer.createElement('mat-card-title');
    const description = this.renderer.createElement('mat-card-content');
    const lessonsTitle = this.renderer.createElement('h4');
    const materialsTitle = this.renderer.createElement('h4');

    this.renderer.setProperty(title, 'innerText', course.title);
    this.renderer.setProperty(description, 'innerText', course.description);

    this.renderer.setProperty(lessonsTitle, 'innerText', 'Lessons:');
    const lessonsList = this.renderer.createElement('ul');
    course.lessons.forEach(lesson => {
      const listItem = this.renderer.createElement('li');
      this.renderer.setProperty(listItem, 'innerText', lesson);
      this.renderer.appendChild(lessonsList, listItem);
    });

    this.renderer.setProperty(materialsTitle, 'innerText', 'Download Materials:');
    const materialsList = this.renderer.createElement('ul');
    course.materials.forEach(material => {
      const listItem = this.renderer.createElement('li');
      const link = this.renderer.createElement('a');
      this.renderer.setProperty(link, 'innerText', material);
      this.renderer.setProperty(link, 'href', material); // Assuming material is a URL
      this.renderer.setProperty(link, 'target', '_blank');
      this.renderer.appendChild(listItem, link);
      this.renderer.appendChild(materialsList, listItem);
    });

    this.renderer.appendChild(card, title);
    this.renderer.appendChild(card, description);
    this.renderer.appendChild(card, lessonsTitle);
    this.renderer.appendChild(card, lessonsList);
    this.renderer.appendChild(card, materialsTitle);
    this.renderer.appendChild(card, materialsList);
    this.renderer.appendChild(this.el.nativeElement, card);
  }
}
