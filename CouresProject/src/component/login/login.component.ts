import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule,MatCardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isRegister = false;
  constructor(private fb: FormBuilder ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 9;

    if (hasUpperCase && hasLowerCase && hasNumber && isValidLength) {
      return null;
    }
    return { 'passwordStrength': true }; 
  }
  onSubmit() {
    console.log('Form Submitted!', this.loginForm.value);
    //this.loginService.addUser(this.loginForm.value)
  }
  toggleRegister() {
    this.isRegister = !this.isRegister;
  }
}

