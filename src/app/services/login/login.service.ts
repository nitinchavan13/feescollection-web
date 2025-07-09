import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _userLoggedIn = new BehaviorSubject(false);

  constructor() { }

  get userLoggedIn(): Observable<boolean> {
    return this._userLoggedIn.asObservable();
  }

  setLoggedInState(state: boolean) {
    this._userLoggedIn.next(state);
  }
}
