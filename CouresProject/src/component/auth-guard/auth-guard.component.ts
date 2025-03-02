import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  standalone: true,
  imports: [],
  templateUrl: './auth-guard.component.html',
  styleUrl: './auth-guard.component.css'
})
@Injectable({
 providedIn: 'root'
})

export class AuthGuardComponent {
   constructor(private router: Router) {}
  
   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean {
     const isLoggedIn = this.isLoggedIn(); // בדוק אם המשתמש מחובר
  
     if (!isLoggedIn) {
       this.router.navigate(['/login']); // אם לא מחובר, העבר לדף התחברות
       return false;
     }
     return true; // אם כן, אפשר לעבור לרוט
   }
  
   private isLoggedIn(): boolean {
     return !!localStorage.getItem('user'); // בדוק אם יש משתמש מחובר ב-localStorage
   }
  }
  

