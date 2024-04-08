import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientComponent } from './client/client.component';
import { EmployeComponent } from './employe/employe.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatTabsModule,
    ClientComponent,
    EmployeComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
