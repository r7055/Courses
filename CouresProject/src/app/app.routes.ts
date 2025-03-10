import { Routes } from '@angular/router';
import { MenueComponent } from '../component/menue/menue.component';
import { LoginComponent } from '../component/login/login.component';
import { CoursesComponent } from '../component/courses/courses.component';
import { LessonListComponent } from '../component/lesson-list/lesson-list.component';

export const routes: Routes = [
    {
        path: '', component: MenueComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'join', component: LessonListComponent }
        ]
    }
];
