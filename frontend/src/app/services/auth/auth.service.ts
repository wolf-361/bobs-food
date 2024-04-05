import { Injectable } from '@angular/core';
import { UserRole } from '../../dto/user/user-role';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private logger: LoggerService
  ) { }

  /**
   * Get the token from the local storage
   */
  public get Token(): string {
    return localStorage.getItem('acces_token') || '';
  }

  /**
   * Set user session
   */
  public set Session(response: { token:string, expiresIn: number, role: UserRole }) {
    // Check if the response is not null
    if (!response) {
      this.logger.auth('Response is null');
      return;
    }

    // Check that it contains everything we need
    if (!response.token || !response.expiresIn || !response.role) {
      this.logger.auth('Response is missing some data (token, expiresIn, role) ' + JSON.stringify(response));
      return;
    }

    // Set the token in the local storage
    localStorage.setItem('acces_token', response.token);
    localStorage.setItem('expires_in', (Date.now() + response.expiresIn * 1000).toString());
    localStorage.setItem('role', response.role);
  }

  /**
   * Clear the user session
   */
  public clearSession(): void {
    localStorage.removeItem('acces_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('role');
  }

  /**
   * Check if the user is authenticated
   */
  public get IsAuthenticated(): boolean {
    // Check if the token is present
    if (!this.Token) {
      return false;
    }

    // Check if the token is expired
    if (Number(localStorage.getItem('expires_in')) < Date.now()) {
      return false;
    }

    return true;
  }

  /**
   * Get the role of the user
   */
  public get Role(): UserRole {
    return localStorage.getItem('role') as UserRole;
  }
}
