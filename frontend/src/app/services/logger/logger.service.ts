import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Commande } from '../../dto/commande/commande';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  api(message: string): void {
    this.log('🚀 [API]: ' + message);
  }

  auth(message: string): void {
    this.log('🔐 [AUTH]: ' + message);
  }

  commande(message: string) {
    this.log('🍔 [COMMANDE]: ' + message);
  }

  log(message: string): void {
    if (!environment.production) {
      console.log(message);
    }
  }

  error(message: string): void {
    if (!environment.production) {
      console.error(message);
    }
  }

  warn(message: string): void {
    if (!environment.production) {
      console.warn(message);
    }
  }

  info(message: string): void {
    if (!environment.production) {
      console.info(message);
    }
  }
}
