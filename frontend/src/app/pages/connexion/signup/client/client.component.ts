import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoginResponse } from '../../../../services/auth/login.response';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS, StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  signupForm: FormGroup = new FormGroup({
    courriel: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator('password')]),
  });

  clientInfoForm: FormGroup = new FormGroup({
    prenom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    nom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    adresse: new FormControl('', [Validators.required]),
  });

  creditCardForm: FormGroup = new FormGroup({
    titulaireCarteCredit: new FormControl('', [requiredIfFormTouched, Validators.pattern(/^[a-zA-Z]+$/)]), // Si non présent, on prend le nom et prénom du client
    numeroCarteCredit: new FormControl('', [requiredIfFormTouched, Validators.pattern(/^[0-9]{16}$/)]),
    dateExpiration: new FormControl('', [requiredIfFormTouched, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]),
    cvcCarteCredit: new FormControl('', [requiredIfFormTouched, Validators.pattern(/^[0-9]{3}$/)]),
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    breakpointObserver: BreakpointObserver
  ) { 
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  /**
 * Getter for easy access to form fields
 * @returns {Object} The form controls
 * @example form['email'].value
 */
  get signup(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  get clientInfo(): { [key: string]: AbstractControl } {
    return this.clientInfoForm.controls;
  }

  get creditCard(): { [key: string]: AbstractControl } {
    return this.creditCardForm.controls;
  }

  verifierSignupForm() {
  }

  verifierClientInfoForm() {
  }

  verifierCreditCardForm() {
  }

  verifier() {
    // TODO: Vérifier le client pour que le client puisse confirmer son inscription
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      return;
    }
    // TODO: signup
  }

  /**
   * Handle the http success response from the signup request
   * @param response The response to handle
   */
  private handleSignupSuccess(response: LoginResponse): void {
    // Store the session in the auth service
    this.auth.Session = response;

    // Redirect to the home
    this.router.navigate(['/']);   
  }

  /**
   * Handle the http error response from the signup request
   * @param error The error to handle
   */
  private handleSignupError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.snackBar.open('Email ou mot de passe invalide', 'Fermer', { duration: 5000 });
      // Clear the fields
      this.signupForm.reset();
    }

    if (error.status === 404) {
      this.snackBar.open('Utilisateur introuvable', 'Fermer', { duration: 5000 });
      this.signupForm.reset();
    }
    
    if (error.status === 500) {
      this.snackBar.open('Erreur interne du serveur', 'Fermer', { duration: 5000 });
    }
  }

}


function confirmPasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Get the password control
    const password = control.root.get(controlName)?.value;

    // Return if the confirm password control is not empty. And if the password and confirm password controls values are the same
    const forbidden = control.value !== password;
    return password && forbidden ? { mismatch: true } : null;
  };
}

function requiredIfFormTouched(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Return true if any of the controls in the form group is touched
    return control.parent?.touched ? Validators.required(control) : null;
  };
}
