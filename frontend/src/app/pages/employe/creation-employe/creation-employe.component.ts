import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from "@angular/common";
import { map, Observable } from "rxjs";
import { StepperOrientation } from "@angular/cdk/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { MatOption, MatSelect } from "@angular/material/select";
import { ApiService } from "../../../services/api/api.service";
import { CreateEmploye } from "../../../dto/user/create-employe";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeType } from "../../../dto/user/employe-type";

@Component({
  selector: 'app-creation-employe',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    AsyncPipe,
    MatIcon,
    MatTooltip,
    MatOption,
    MatSelect,
  ],
  templateUrl: './creation-employe.component.html',
  styleUrl: './creation-employe.component.scss'
})

export class CreationEmployeComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    identifiant: new FormControl('', [Validators.required]),
    courriel: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), Validators.minLength(6), Validators.maxLength(20)]),
    confirmationMotDePasse: new FormControl('', [Validators.required, confirmPasswordValidator('motDePasse')]),
    role: new FormControl('', [Validators.required]),
  });

  stepperOrientation: Observable<StepperOrientation>;
  employe?: CreateEmploye;

  roles: { key: EmployeType, value: string }[] = [
    { key: EmployeType.EMPLOYE, value: 'Employé' },
    { key: EmployeType.GESTIONNAIRE, value: 'Gérant' },
    { key: EmployeType.ADMIN, value: 'Administrateur' },
    { key: EmployeType.PROPRIO, value: 'Propriétaire' }
  ];

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  verifierFirstFormGroup() {
    if (!this.firstFormGroup.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }
  }

  verifierSecondFormGroup() {
    if (!this.secondFormGroup.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }
  }

  getRole(): string {
    // make sure it's not null or undefined
    if (!this.secondFormGroup.value.role) {
      return '';
    }

    return this.roles.find(role => role.key === this.secondFormGroup.value.role)?.value || '';
  }

  onSubmit() {
    if (!this.secondFormGroup.valid || !this.firstFormGroup.valid) {
      return;
    }

    // Check for the first form group
    if (!this.firstFormGroup.value.nom || !this.firstFormGroup.value.prenom || !this.firstFormGroup.value.adresse) {
      this.snackBar.open('Veuillez remplir tous les champs du premier formulaire', 'Fermer', { duration: 5000 });
      return;
    }

    // Check for the second form group
    if (!this.secondFormGroup.value.identifiant || !this.secondFormGroup.value.courriel || !this.secondFormGroup.value.motDePasse || !this.secondFormGroup.value.confirmationMotDePasse || !this.secondFormGroup.value.role) {
      this.snackBar.open('Veuillez remplir tous les champs du deuxième formulaire', 'Fermer', { duration: 5000 });
      return;
    }

    // Get the employe type
    const employeType = this.roles.find(role => role.key === this.secondFormGroup.value.role)?.key;

    this.employe = {
        employeId: this.secondFormGroup.value.identifiant,
        nom: this.firstFormGroup.value.nom,
        prenom: this.firstFormGroup.value.prenom,
        adresse: this.firstFormGroup.value.adresse,
        password: this.secondFormGroup.value.motDePasse,
        confirmPassword: this.secondFormGroup.value.confirmationMotDePasse,
        type: employeType || EmployeType.EMPLOYE,
      };

      this.api.signupEmploye(this.employe).subscribe({
        next: (response) => {
          if (!response) {
            this.snackBar.open('Erreur lors de la création de l\'employé', 'Fermer', { duration: 5000 });
            return;
          }
          this.snackBar.open('Employé créé avec succès', 'Fermer', { duration: 5000 });
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la création de l\'employé', 'Fermer', { duration: 5000 });
        }
      });
      
      // Reset
      window.location.reload();
  }




  // Giga cool
  generateIdentifiant() {
    // Generate an identifiant for the employe based on the first and last name
    if (this.firstFormGroup.controls['nom'].value && this.firstFormGroup.controls['prenom'].value) {
      // Generate a random id based on the last name
      const numNomId = 1 + Math.floor(Math.random() * 3);
      const nomId = this.firstFormGroup.controls['nom'].value.slice(0, numNomId).toUpperCase();

      // Generate a random id based on the first name
      const numPrenomId = 1 + Math.floor(Math.random() * 3);
      const prenomId = this.firstFormGroup.controls['prenom'].value.slice(0, numPrenomId).toUpperCase();

      // Generate a random id based on the remaining characters
      const numRandomId = 8 - (nomId.length + prenomId.length);
      const randomId = Math.floor(Math.random() * Math.pow(10, numRandomId)).toString().padStart(numRandomId, '0');

      // Set the generated id
      this.secondFormGroup.controls['identifiant'].patchValue(nomId + prenomId + randomId, { emitEvent: false });

    }

  }
}

// Fonction for the password confirmation validator
function confirmPasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Get the password control
    const password = control.root.get(controlName)?.value;

    // Return if the confirm password control is not empty. And if the password and confirm password controls values are the same
    const forbidden = control.value !== password;
    return password && forbidden ? { mismatch: true } : null;
  };
}
