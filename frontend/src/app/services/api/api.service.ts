import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Commande } from '../../dto/commande/commande';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { Item } from '../../dto/item/item';
import { Employe } from '../../dto/user/employe';
import { Client } from '../../dto/user/client';
import { LoginResponse } from '../auth/login.response';
import { ItemCategory } from '../../dto/item/item-categorie';
import { CreateClient } from '../../dto/user/create-client';
import { CreateEmploye } from '../../dto/user/create-employe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = env.apiUrl;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { 
    this.logger.api('API service started, using API URL: ' + this.apiUrl);
  }

  // Commande methods
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commande`).pipe(
      catchError(this.handleError),
      retry(3),
      this.orderBy('date', 'desc')
    );
  }

  getCommande(id: string): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/commande/${id}`).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  postCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/commande`, commande).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  patchCommande(id: string, commande: Commande): Observable<Commande> {
    return this.http.patch<Commande>(`${this.apiUrl}/commande/${id}`, commande).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  deleteCommande(id: string): Observable<Commande> {
    return this.http.delete<Commande>(`${this.apiUrl}/commande/${id}`).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  // Restaurent methods
  getRestaurents(): Observable<Restaurent[]> {
    return this.http.get<Restaurent[]>(`${this.apiUrl}/restaurent`).pipe(
      catchError(this.handleError),
      retry(3),
      this.orderBy('adresse', 'asc')
    );
  }

  getRestaurent(id: string): Observable<Restaurent> {
    return this.http.get<Restaurent>(`${this.apiUrl}/restaurent/${id}`).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  postRestaurent(restaurent: Restaurent): Observable<Restaurent> {
    return this.http.post<Restaurent>(`${this.apiUrl}/restaurent`, restaurent).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  patchRestaurent(id: string, restaurent: Restaurent): Observable<Restaurent> {
    return this.http.patch<Restaurent>(`${this.apiUrl}/restaurent/${id}`, restaurent).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  // Item methods
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/item`).pipe(
      catchError(this.handleError),
      retry(3),
      this.orderBy('nom', 'asc')
    );
  }

  getItemsByCategory(category: ItemCategory): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/item?categorie=${category}`).pipe(
      catchError(this.handleError),
      retry(3),
      this.orderBy('nom', 'asc')
    );
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/item/${id}`).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  // User methods
  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/employe`).pipe(
      catchError(this.handleError),
      retry(3),
      this.orderBy('nom', 'asc')
    );
  }

  getEmploye(id: string): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/employe/${id}`).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  loginEmploye(employeId: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/employe/login`, { employeId, password }).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  signupEmploye(employe: CreateEmploye): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/employe/signup`, employe).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/client`).pipe(
      catchError(this.handleError),
      retry(3),
      this.orderBy('nom', 'asc')
    );
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/${id}`).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  loginClient(courriel: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/client/login`, { courriel, password }).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  signupClient(client: CreateClient): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/client/signup`, client).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  // General methods

  /**
   * Handle the error and log it
   * @param error The error to handle
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    // Throw the error to the subscriber (in a non deprecated way)
    return new Observable<never>(subscriber => {
      subscriber.error(error);
    });
  }

  /**
   * Filter the data by the given key (used in the pipe on http.get)
   * @param key The key to filter by
   * @param order The order to sort by
   * @returns A function that filters the data by the given key
   */
  public orderBy<T>(key: keyof T, order: 'asc' | 'desc'): (source: Observable<T[]>) => Observable<T[]> {
    return (source: Observable<T[]>) => source.pipe(
      tap(() => this.logger.api(`Ordering by ${String(key)} ${order}`)),
      map(data => data.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
      })));
  }
}
