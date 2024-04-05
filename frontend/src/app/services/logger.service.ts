import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  api(message: string): void {
    this.log('🚀 [API]: ' + message);
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
