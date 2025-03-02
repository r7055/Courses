import { NgModule } from '@angular/core';
import {  Routes } from '@angular/router';
import { MenueComponent } from '../component/menue/menue.component';
import { LoginComponent } from '../component/login/login.component';
import { CoursesComponent } from '../component/courses/courses.component';

export const routes: Routes = [
    {
        path: '', component: MenueComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'courses', component: CoursesComponent },
        ]
    }
];
