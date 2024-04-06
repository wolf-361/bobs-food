import { Injectable } from '@angular/core';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { ApiService } from '../api/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurentService {

  constructor(
    private api: ApiService
  ) { }

  public set restaurent(restaurent: Restaurent) {
    localStorage.setItem('restaurentId', restaurent.id);
  }

  public get restaurent(): Observable<Restaurent> {
    if (!this.restaurentId) {
      // Return the first restaurent in the list
      return this.api.getRestaurents().pipe(
        map(restaurents => restaurents[0])
      );
    } else {
      return this.api.getRestaurent(this.restaurentId);
    }
  }

  private get restaurentId(): string {
    return localStorage.getItem('restaurentId') || '';
  }
}
