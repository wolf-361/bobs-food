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
import { Client } from '../../../../dto/user/client';
import { CreateClient } from '../../../../dto/user/create-client';

@Component({
  selector: 'app-client-signup',
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
    titulaireCarteCredit: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]), // Si non présent, on prend le nom et prénom du client
    numeroCarteCredit: new FormControl('', [Validators.pattern(/^[0-9]{16}$/)]),
    dateExpiration: new FormControl('', [Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]),
    cvcCarteCredit: new FormControl('', [Validators.pattern(/^[0-9]{3}$/)]),
  });

  stepperOrientation: Observable<StepperOrientation>;
  client?: CreateClient;

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

  // Vérifier si le client est déjà inscrit
  verifierSignup() {
    if (!this.signupForm.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }

    // Vérifier si le client est déjà inscrit
    this.api.getClient(this.signupForm.value.courriel).subscribe(
      (response) => {
        // Si le client n'est pas inscrit, on affiche un message de succès
        if (response === null) {
          return
        }
        // Si le client est déjà inscrit, on affiche un message d'erreur
        this.snackBar.open('Le client est déjà inscrit', 'Fermer', { duration: 5000 });
      },
    );
  }

  verifierClientInfo() {
    if (!this.clientInfoForm.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }
  }

  verifierCreditCard() {
    if (!this.creditCardForm.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }

    // Vérifier que si un champs as été touché, les autres champs sont remplis (note le nom peut être vide si on prend le nom et prénom du client (mettre case à cocher))
    if (this.creditCardForm.touched) {
      // Si un champs est rempli, tous les champs doivent être remplis
      if (this.creditCardForm.value.titulaireCarteCredit != '' || this.creditCardForm.value.numeroCarteCredit != '' || this.creditCardForm.value.dateExpiration != '' || this.creditCardForm.value.cvcCarteCredit != '') {
        if (!this.creditCardForm.value.titulaireCarteCredit || !this.creditCardForm.value.numeroCarteCredit || !this.creditCardForm.value.dateExpiration || !this.creditCardForm.value.cvcCarteCredit) {
          this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
          return;
        }
      }
    }
  }

  verifier() {
    if (!this.signupForm.valid || !this.clientInfoForm.valid || !this.creditCardForm.valid) {
      return;
    }

    let titulaireCarteCredit: string | null;
    let numeroCarteCredit: string | null;
    let dateExpiration: string | null;
    let cvcCarteCredit: string | null;

    // Si la carte de crédit n'est pas valide (un champs autre que nom vide), on ne l'inclut pas dans le client
    if (this.creditCardForm.value.numeroCarteCredit && this.creditCardForm.value.dateExpiration && this.creditCardForm.value.cvcCarteCredit) {
      // Si le titulaire de la carte n'est pas spécifié, on prend le nom et prénom du client
      if (!this.creditCardForm.value.titulaireCarteCredit) {
        this.creditCardForm.value.titulaireCarteCredit = this.clientInfoForm.value.prenom + ' ' + this.clientInfoForm.value.nom;
      }

      const date = this.creditCardForm.value.dateExpiration.split('/');

      this.client = {
        courriel: this.signupForm.value.courriel,
        prenom: this.clientInfoForm.value.prenom,
        nom: this.clientInfoForm.value.nom,
        estInscrit: true,
        adresse: this.clientInfoForm.value.adresse,
        password: this.signupForm.value.password,
        confirmPassword: this.signupForm.value.confirmPassword,
        titulaireCarteCredit: this.creditCardForm.value.titulaireCarteCredit,
        numeroCarteCredit: this.creditCardForm.value.numeroCarteCredit,
        dateExpirationCarteCredit: this.creditCardForm.value.dateExpiration,
        cvcCarteCredit: this.creditCardForm.value.cvcCarteCredit,
      };
    } else {
      this.client = {
        courriel: this.signupForm.value.courriel,
        prenom: this.clientInfoForm.value.prenom,
        nom: this.clientInfoForm.value.nom,
        estInscrit: true,
        adresse: this.clientInfoForm.value.adresse,
        password: this.signupForm.value.password,
        confirmPassword: this.signupForm.value.confirmPassword,
      };
    }
  }

  onSubmit() {
    if (!this.signupForm.valid || !this.clientInfoForm.valid || !this.creditCardForm.valid) {
      return;
    }
    
    this.verifier(); // Vérifier les informations du client (etre certain que le client est fait )

    if (!this.client) {
      return;
    }

    // Inscrire le client
    this.api.signupClient(this.client).subscribe({
      next: (response: LoginResponse) => this.handleSignupSuccess(response),
      error: (error: HttpErrorResponse) => this.handleSignupError(error)
    });


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
