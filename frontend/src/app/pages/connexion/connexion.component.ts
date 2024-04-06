import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent,
    MatTabsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

}
