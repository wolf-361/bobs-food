import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoginResponse } from '../../../../services/auth/login.response';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss'
})
export class EmployeComponent {
  loginForm: FormGroup = new FormGroup({
    employeId: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]+$)/)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    
  }

  /**
 * Getter for easy access to form fields
 * @returns {Object} The form controls
 * @example form['email'].value
 */
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.api.loginEmploye(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error)
    });
  }

  /**
   * Handle the http success response from the login request
   * @param response The response to handle
   */
  private handleLoginSuccess(response: LoginResponse): void {
    // Store the session in the auth service
    this.auth.Session = response;

    // Redirect to the home
    this.router.navigate(['/']);   
  }

  /**
   * Handle the http error response from the login request
   * @param error The error to handle
   */
  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.snackBar.open('Email ou mot de passe invalide', 'Fermer', { duration: 5000 });
      // Clear the fields
      this.loginForm.reset();
    }

    if (error.status === 404) {
      this.snackBar.open('Utilisateur introuvable', 'Fermer', { duration: 5000 });
      this.loginForm.reset();
    }
    
    if (error.status === 500) {
      this.snackBar.open('Erreur interne du serveur', 'Fermer', { duration: 5000 });
    }
  }
}
