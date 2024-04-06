import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientComponent } from './client/client.component';
import { EmployeComponent } from './employe/employe.component';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatTabsModule,
    ClientComponent,
    EmployeComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
