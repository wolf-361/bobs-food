import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterModule
  ],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss'
})
export class EmployeComponent {
  links= [
    { path: 'modify-command', label: 'Modifier une commande', roles: 'employe, gestionnaire, admin, proprietaire'},
    { path: 'create', label: 'Créer un employer', roles: 'gestionnaire, admin, proprietaire'},
    { path: 'modify-menu', label: 'Modifier le menu', roles: 'gestionnaire, admin, proprietaire'}
  ];
  activeLink = this.links[0];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Get the active link from the route
    this.activeLink = this.links.find(link => link.path == this.route.snapshot.firstChild?.url[0].path.split('/')[0]) || this.links[0];

    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.activeLink = this.links.find(link => link.path == this.route.snapshot.firstChild?.url[0].path.split('/')[0]) || this.links[0];
    });
  }

  isAuthorized(roles: string): boolean {
    // Split the roles string into an array
    const rolesArray = roles.split(', ');
    // Check if the user has one of the roles
    return rolesArray.some(role => this.authService.hasRole(role));
  }
}
