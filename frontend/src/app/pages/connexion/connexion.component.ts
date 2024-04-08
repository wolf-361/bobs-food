import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { SignupComponent } from './signup/signup.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent,
    MatTabsModule,
    RouterModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit {
  links= [
    { path: 'login', label: 'Login' },
    { path: 'register', label: 'Register' }
  ];
  activeLink = this.links[0];


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Get the active link from the route
    this.activeLink = this.links.find(link => link.path == this.route.snapshot.firstChild?.url[0].path.split('/')[0]) || this.links[0];

    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.activeLink = this.links.find(link => link.path == this.route.snapshot.firstChild?.url[0].path.split('/')[0]) || this.links[0];
    });
  }

}
