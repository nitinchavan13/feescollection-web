import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class ObservableDataService {
  private userLoggedInStatus = new BehaviorSubject(false);
  userLoginStatus = this.userLoggedInStatus.asObservable();
  private _userData = new BehaviorSubject<UserModel>(null);
  userData = this._userData.asObservable();

  setMyLoginStatus(status) {
    this.userLoggedInStatus.next(status);
  }

  setLoggedInUserData(userData: UserModel) {
    this._userData.next(userData);
  }
}
