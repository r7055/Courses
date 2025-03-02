import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { log } from 'console';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-menue',
  standalone: true,
  imports: [],
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.css'
})
export class MenueComponent {
routes:Route={
  // {path:"/home",Component:LoginComponent}
}
}
