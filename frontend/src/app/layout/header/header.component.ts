import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { EmployeType } from '../../dto/user/employe-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  showMobileMenu = false;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private auth: AuthService,
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    // Listen to click events on the document
    document.addEventListener('click', (event) => {
      if (!this.mobileMenu) return;
      // Close the mobile menu if the click event was outside the menu
      // If the click is outside of the menu, close it
      if (!this.elementRef.nativeElement.contains(event.target) || this.mobileMenu.nativeElement.contains(event.target)) {
        this.showMobileMenu = false;
      }
    });
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  isLoggedIn() {
    return this.auth.IsAuthenticated;
  }

  isEmployer() {
    return this.auth.isEmploye();
  }

  logout() {
    this.auth.clearSession();
  }

  isOnAuthPage() {
    return location.pathname.includes('/auth');
  }
}
