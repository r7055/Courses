// import { Component } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../service/auth.service';
// import { UserType } from '../../models/userType';
// import { HttpClientModule } from '@angular/common/http';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [HttpClientModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
//   templateUrl: './login.component.html', // Ensure this points to the correct HTML file
//   styleUrls: ['./login.component.css'] // Corrected to styleUrls
// })
// export class LoginComponent { // Renamed to RegisterComponent
//   loginForm!: FormGroup;
//   isRegister = false;

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.loginForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, this.passwordValidator]],
//       role: ['student', Validators.required]
//     });
//   }

//   passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     const password = control.value;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const isValidLength = password.length >= 9;

//     if (hasUpperCase && hasLowerCase && hasNumber && isValidLength) {
//       return null;
//     }
//     return { 'passwordStrength': true };
//   }

//   toggleRegister() {
//     this.isRegister = !this.isRegister;
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const user: UserType = this.loginForm.value;
//       if (this.isRegister) {
//         this.authService.register(user).subscribe(response => {
//           console.log('User registered:', response);
//         }, error => {
//           console.error('Registration error:', error);
//         });
//       } else {
//         this.authService.login(user.email, user.password).subscribe(response => {
//           console.log('User logged in:', response);
//         }, error => {
//           console.error('Login error:', error);
//         });
//       }
//     }
//   }
// }
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UserType } from '../../models/userType';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './login.component.html', // ודא שזה מצביע על הקובץ HTML הנכון
  styleUrls: ['./login.component.css'] // ודא שזה מצביע על הקובץ CSS הנכון
})
export class LoginComponent { // השאר את השם LoginComponent
  loginForm!: FormGroup; // השאר את השם loginForm
  isRegister = false; // הגדר את ברירת המחדל ל-FALSE

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      role: ['student', Validators.required] // שדה תפקיד
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

  toggleRegister() {
    this.isRegister = !this.isRegister; // משנה את מצב ההרשמה
    if (this.isRegister) {
      this.loginForm.addControl('name', this.fb.control('', Validators.required)); // הוסף שדה שם
    } else {
      this.loginForm.removeControl('name'); // הסר את שדה השם אם לא בהרשמה
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let user: UserType;

      if (this.isRegister) {
        // אם זה מצב הרשמה, הוסף את השם לאובייקט
        user = {
          name: this.loginForm.value.name,
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          role: this.loginForm.value.role
        };
      } else {
        // אם זה מצב כניסה, שלח את האימייל והסיסמה בלבד
        user = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
      }

      if (this.isRegister) {
        this.authService.register(user).subscribe(response => {
          console.log('User registered:', response);
        }, error => {
          console.error('Registration error:', error);
        });
      } else {
        this.authService.login(user.email, user.password).subscribe(response => {
          console.log('User logged in:', response);
        }, error => {
          console.error('Login error:', error);
        });
      }
    }
  }

}
