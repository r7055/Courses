// // import { Component } from '@angular/core';
// // import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { AuthService } from '../../service/auth.service';
// // import { UserType } from '../../models/userType';
// // import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // ייבוא MatDialogRef
// // import { HttpClientModule } from '@angular/common/http';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatCardModule } from '@angular/material/card';

// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [ReactiveFormsModule,HttpClientModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent {
// //   loginForm!: FormGroup;
// //   isRegister = false;

// //   constructor(private dialog: MatDialog,private fb: FormBuilder, private authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>) {
// //     this.loginForm = this.fb.group({
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', [Validators.required, this.passwordValidator]],
// //       role: ['student', Validators.required]
// //     });
// //   }
// //   openLoginDialog() {
// //     this.dialog.open(LoginComponent);
// //   }
// //   passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
// //     const password = control.value;
// //     const hasUpperCase = /[A-Z]/.test(password);
// //     const hasLowerCase = /[a-z]/.test(password);
// //     const hasNumber = /\d/.test(password);
// //     const isValidLength = password.length >= 9;

// //     if (hasUpperCase && hasLowerCase && hasNumber && isValidLength) {
// //       return null;
// //     }
// //     return { 'passwordStrength': true };
// //   }

// //   toggleRegister() {
// //     this.isRegister = !this.isRegister;
// //     if (this.isRegister) {
// //       this.loginForm.addControl('name', this.fb.control('', Validators.required));
// //     } else {
// //       this.loginForm.removeControl('name');
// //     }
// //   }

// //   onSubmit() {
// //     if (this.loginForm.valid) {
// //       let user: UserType;

// //       if (this.isRegister) {
// //         user = {
// //           name: this.loginForm.value.name,
// //           email: this.loginForm.value.email,
// //           password: this.loginForm.value.password,
// //           role: this.loginForm.value.role
// //         };

// //         // הרשם את המשתמש
// //         this.authService.register(user).subscribe(response => {
// //           console.log('User registered:', response);
// //           // התחבר אוטומטית לאחר ההרשמה
// //           this.authService.login(user.email, user.password).subscribe(loginResponse => {
// //             console.log('User logged in:', loginResponse);
// //             this.dialogRef.close(); // סגור את הדיאלוג
// //           }, error => {
// //             console.error('Login error:', error);
// //           });
// //         }, error => {
// //           console.error('Registration error:', error);
// //         });
// //       } else {
// //         user = {
// //           email: this.loginForm.value.email,
// //           password: this.loginForm.value.password,
// //         };

// //         // התחבר למערכת
// //         this.authService.login(user.email, user.password).subscribe(response => {
// //           console.log('User logged in:', response);
// //           this.dialogRef.close(); // סגור את הדיאלוג
// //         }, error => {
// //           console.error('Login error:', error);
// //         });
// //       }
// //     }
// //   }
// // }
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isRegister = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      role: ['student', Validators.required]
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
    this.isRegister = !this.isRegister;
    if (this.isRegister) {
      this.loginForm.addControl('name', this.fb.control('', Validators.required));
    } else {
      this.loginForm.removeControl('name');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: UserType = this.createUser();

      if (this.isRegister) {
        this.authService.register(user).subscribe({
          next: response => console.log('User registered:', response),
          error: error => console.error('Registration error:', error)
        });
      } else {
        this.authService.login(user.email, user.password).subscribe({
          next: response => console.log('User logged in:', response),
          error: error => console.error('Login error:', error)
        });
      }
      //here close the dialog and navigate to the courses page
    }
  }

  private createUser(): UserType {
    return this.isRegister ? {
      name: this.loginForm.value.name,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      role: this.loginForm.value.role
    } : {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  }
}


