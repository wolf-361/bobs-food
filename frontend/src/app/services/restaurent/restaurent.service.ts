import { Injectable } from '@angular/core';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurentService {
  private prefix: string;
  private _restaurent!: BehaviorSubject<Restaurent>;

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { 
    this._restaurent = new BehaviorSubject<Restaurent>({} as Restaurent);

    if (this.restaurentId !== '') {
      this.api.getRestaurent(this.restaurentId).subscribe((restaurent) => {
        this._restaurent.next(restaurent);
      });
    } else {
      this.api.getRestaurents().pipe(
        map((restaurents) => restaurents[0])
      ).subscribe((restaurent) => {
        this._restaurent.next(restaurent);
        this.restaurent = restaurent;
      });
    }
    
    this.prefix = this.auth.Role
  }

  public get restaurent(): Observable<Restaurent> {
    return this._restaurent.asObservable();
  }

  public set restaurent(restaurent: Restaurent) {
    this._restaurent.next(restaurent); // Update the observable
    localStorage.setItem(this.prefix + 'restaurentId', restaurent.id); // Update the local storage
  }

  private get restaurentId(): string {
    return localStorage.getItem(this.prefix + 'restaurentId') || '';
  }
}
