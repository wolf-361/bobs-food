import {Component} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  ValidatorFn,
  AbstractControl, ValidationErrors
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

  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onSubmit() {

  }

  generateIdentifiant() {
    // Generate a random number and letters for the identifier of 8 characters
    const randomString = Math.random().toString(36).substring(2, 10);
    this.firstFormGroup.controls.identifiant.setValue(randomString);
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
