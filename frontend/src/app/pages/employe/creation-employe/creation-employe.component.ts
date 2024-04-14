import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {AsyncPipe, NgIf} from "@angular/common";
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatOption, MatSelect} from "@angular/material/select";
import {ApiService} from "../../../services/api/api.service";
import {CreateEmploye} from "../../../dto/user/create-employe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeType} from "../../../dto/user/employe-type";

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
    MatRadioButton,
    MatRadioGroup,
    NgIf,
    AsyncPipe,
    MatIcon,
    MatTooltip,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelect,
    MatOption,
  ],
  templateUrl: './creation-employe.component.html',
  styleUrl: './creation-employe.component.scss'
})

export class CreationEmployeComponent {

  /*
  * employeId = employeId;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.type = type;
        * */
  firstFormGroup = this.fb.group({
    identifiant: new FormControl('', [Validators.required]),
    courriel: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), Validators.minLength(6), Validators.maxLength(20)]),
    confirmationMotDePasse: new FormControl('', [Validators.required, confirmPasswordValidator('motDePasse')]),
    role: ['', Validators.required],
  });


  secondFormGroup = this.fb.group({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    adresse: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;
  employe?: CreateEmploye;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }


  verifierSecondFormGroup(){
    if (!this.secondFormGroup.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }
  }

  verifierFirstFormGroup(){
    if (!this.firstFormGroup.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }
  }



  onSubmit() {

    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
      return;
    }

    if(this.firstFormGroup.value.identifiant != null && this.firstFormGroup.value.motDePasse != null &&
      this.firstFormGroup.value.confirmationMotDePasse != null && this.firstFormGroup.value.role != null &&
      this.secondFormGroup.value.nom != null && this.secondFormGroup.value.prenom != null && this.secondFormGroup.value.adresse != null
      && this.firstFormGroup.value.role != null) {

      this.employe = {
        employeId: this.firstFormGroup.value.identifiant,
        nom: this.secondFormGroup.value.nom,
        prenom: this.secondFormGroup.value.prenom,
        adresse: this.secondFormGroup.value.adresse,
        password: this.firstFormGroup.value.motDePasse,
        confirmPassword: this.firstFormGroup.value.confirmationMotDePasse,
        type: EmployeType.EMPLOYE, // TODO: Change this to the selected role
      };

      this.api.signupEmploye(this.employe).subscribe(
        (response) => {
          this.snackBar.open('Employé créé avec succès', 'Fermer', {duration: 5000});
        },
        (error) => {
          this.snackBar.open('Erreur lors de la création de l\'employé', 'Fermer', {duration: 5000});
        }
      );

      // Reset the form
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();

      // Reset page
      // TODO: Reset page
    }

  }





  generateIdentifiant() {
    // Generate an identifiant for the employe based on the first and last name
    if (this.secondFormGroup.controls['nom'].value && this.secondFormGroup.controls['prenom'].value) {
      // Generate a random id based on the last name
      const numNomId = 1 + Math.floor(Math.random() * 3);
      const nomId = this.secondFormGroup.controls['nom'].value.slice(0, numNomId).toUpperCase();

      // Generate a random id based on the first name
      const numPrenomId = 1 + Math.floor(Math.random() * 3);
      const prenomId = this.secondFormGroup.controls['prenom'].value.slice(0, numPrenomId).toUpperCase();

      // Generate a random id based on the remaining characters
      const numRandomId = 8-(nomId.length + prenomId.length);
      const randomId = Math.floor(Math.random() * Math.pow(10, numRandomId)).toString().padStart(numRandomId, '0');

      // Set the generated id
      this.firstFormGroup.controls['identifiant'].patchValue(nomId + prenomId + randomId, {emitEvent: false});

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
    return password && forbidden ? {mismatch: true} : null;
  };
}
