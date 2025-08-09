import { Injectable, EventEmitter } from '@angular/core';
import { isReturnStatement } from 'typescript';
import { UserModel } from '../models/user.model';

@Injectable()
export class LocalStorageService {

  public setUserLoginState(state) {
    if (state) {
      localStorage.setItem('userLoggedInStatus', 'true');
    } else {
      localStorage.removeItem('userLoggedInStatus');
      localStorage.removeItem('userInfo');
    }
  }

  public getUserLoginState() {
    const isUserLoggedIn = localStorage.getItem('userLoggedInStatus');
    if (isUserLoggedIn && isUserLoggedIn === 'true') {
      return true;
    } else {
      return false;
    }
  }

  public setUserInfo(info) {
    localStorage.setItem('userInfo', JSON.stringify(info));
  }

  public getUserInfo() {
    const info = localStorage.getItem('userInfo');
    if (info !== null) {
      return JSON.parse(info) as UserModel;
    } else {
      return null;
    }
  }

  public setSelectedAcademicYear(year: string) {
    localStorage.setItem('selectedAcademicYear', year);
  }

  public getSelectedAcademicYear() {
    return localStorage.getItem('selectedAcademicYear');
  }

}
