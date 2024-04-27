import { Injectable } from '@angular/core';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Item } from '../../dto/item/item';

@Injectable({
  providedIn: 'root'
})
export class RestaurentService {
  private prefix: string;
  private _restaurent!: ReplaySubject<Restaurent>;

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    // Set the prefix to use for the local storage (first cause we use it to get the restaurentId)
    this.prefix = this.auth.Role + '_' || 'guest_';

    this._restaurent = new ReplaySubject<Restaurent>();

    // Now that we have the items, we can get the restaurent
    if (this.restaurentId !== '') {
      this.api.getRestaurent(this.restaurentId).subscribe((restaurent) => {
        this._restaurent.next(restaurent);
      });
    } else {
      this.api.getRestaurents().pipe(
        map((restaurents) => restaurents[0])
      ).subscribe((restaurent) => {
        this.restaurent = restaurent;
      });
    }
  }

  public get restaurent(): Observable<Restaurent> {
    // Return as observable, we also want to send the current value
    return this._restaurent.asObservable();
  }

  public set restaurent(restaurent: Restaurent) {
    this._restaurent.next(restaurent); // Update the observable
    console.log('Restaurent set', restaurent.adresse);
    
    this.restaurentId = restaurent.id; // Update the local storage
  }

  private set restaurentId(id: string) {
    localStorage.setItem(this.prefix + 'restaurentId', id);
  }

  private get restaurentId(): string {
    return localStorage.getItem(this.prefix + 'restaurentId') || '';
  }
}
