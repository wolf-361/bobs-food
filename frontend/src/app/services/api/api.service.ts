import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = env.apiUrl;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { 
    this.logger.api('API service started');
  }

  
}
