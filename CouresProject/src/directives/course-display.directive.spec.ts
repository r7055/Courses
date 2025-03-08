import { TemplateRef, ViewContainerRef } from '@angular/core';
import { CourseDetailsDirective } from './course-display.directive';
import { CourseService } from '../service/course.service';

describe('CourseDisplayDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<any>;
    const viewContainer = {} as ViewContainerRef;
    const courseService = {} as CourseService;
    const directive = new CourseDetailsDirective(templateRef, viewContainer, courseService);
    expect(directive).toBeTruthy();
  });
});
