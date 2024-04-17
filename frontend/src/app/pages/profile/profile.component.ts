import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { EmployeProfileComponent } from './employe-profile/employe-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ClientProfileComponent,
    EmployeProfileComponent
  ],
  template: `
    @if (this.isEmploye()) {
      <app-employe-profile></app-employe-profile>
    } @else {
        <app-client-profile></app-client-profile>
    }
  `,
  styles: [`
    @import "src/styles/constant.scss";

    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        min-height: $page-height;
    }
  `]
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Check if the user is authenticated
    if (!this.authService.IsAuthenticated) {
      // Redirect to the login page
      this.router.navigate(['/login']);
    }
  }

  isEmploye(): boolean {
    return this.authService.isEmploye();
  }

}
