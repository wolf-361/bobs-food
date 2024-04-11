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
  ],
  templateUrl: './creation-employe.component.html',
  styleUrl: './creation-employe.component.scss'
})

export class CreationEmployeComponent {
  firstFormGroup = this.fb.group({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    courriel: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), Validators.minLength(6), Validators.maxLength(20)]),
    confirmationMotDePasse: new FormControl('', [Validators.required, confirmPasswordValidator('motDePasse')]),
    role: ['', Validators.required],
  });


  secondFormGroup = this.fb.group({
    adresse: ['', Validators.required],
    ville: ['', Validators.required],
    codePostal: ['', Validators.required],
    province: ['', Validators.required],
    pays: ['', Validators.required],
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
