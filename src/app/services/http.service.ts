import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { API_ENDPOINTS } from '../_api-endpoints';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class HttpService {

  constructor(
    private router: Router,
    private http: Http,
    private blockUIService: LoadingService,
    private _httpClinet: HttpClient,
    private _storageService: LocalStorageService) { }

  public httpGet(url: string, showLoader = true): Observable<any> {
    this.blockUIService.showSpinner();

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if (typeof (Storage) !== 'undefined') {
      const data = localStorage.getItem('youpi_authdata');
      if (data !== undefined && data !== null) {
        const authData = JSON.parse(data);
        headers.append('Authorization', 'Bearer ' + authData.token);
      }
    }

    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map((response) =>
      this.parseResponse(response, this.blockUIService, true)).catch((err) => this.handleError(err, this.blockUIService, true));
  }

  public httpGetExternal(url: string, showLoader = true): Observable<any> {
    this.blockUIService.showSpinner();

    return this.http.get(url).map((response) =>
      this.parseResponse(response, this.blockUIService, true)).catch((err) => this.handleError(err, this.blockUIService, true));
  }

  public httpPost(url: string, body: any, showLoader = true): Observable<any> {
    this.blockUIService.showSpinner();

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (typeof (Storage) !== 'undefined') {
      const data = localStorage.getItem('youpi_authdata');
      if (data !== undefined && data !== null) {
        const authData = JSON.parse(data);
        headers.append('Authorization', 'Bearer ' + authData.token);
      }
    }
    const loggedInUserData = this._storageService.getUserInfo();
    if (loggedInUserData !== null) {
      if (!url.includes(API_ENDPOINTS.LOGIN())) {
        if (body === null) {
          body = {
            UserId: loggedInUserData.Id,
            AcademicYearId: loggedInUserData.AcademicYearId
          }
        } else {
          body["UserId"] = loggedInUserData.Id;
          body["AcademicYearId"] = loggedInUserData.AcademicYearId;
        }
      }
    } else {
      // navigate user back to login with session invalid msg
    }

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).map((response) =>
      this.parseResponse(response, this.blockUIService, true)).catch((err) => this.handleError(err, this.blockUIService, true));
  }

  public httpPostMultipart(url: string, formData: FormData): Observable<any> {
    this.blockUIService.showSpinner();

    let headers = new Headers();

    const loggedInUserData = this._storageService.getUserInfo();
    if (loggedInUserData !== null) {
      formData.append('userId', loggedInUserData.Id.toString());
      formData.append('academicYearId', loggedInUserData.AcademicYearId.toString());
    }

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, formData, options).map((response) =>
      this.parseResponse(response, this.blockUIService, true)).catch((err) => this.handleError(err, this.blockUIService, true));
  }

  public httpPostWithNoBlock(url: string, body: any, showLoader = true): Observable<any> {
    this.blockUIService.showSpinner();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).map((response) =>
      this.parseResponse(response, this.blockUIService, true))
      .catch((err) => this.handleError(err, this.blockUIService, true));
  }

  public httpPostForm(url: string, body: any): Observable<any> {
    this.blockUIService.showSpinner();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).map((response) =>
      this.parseResponse(response, this.blockUIService, true))
      .catch((err) => this.handleError(err, this.blockUIService, true));
  }

  private handleError(error: any, blockUIService: LoadingService, blocking: Boolean) {
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      const body = error.json();
      this.blockUIService.hideSpinner();
      return Observable.throw(body);
    }
  }

  private parseResponse(response: Response, blockUIService: LoadingService, blocking: Boolean) {
    // let userResponse: any;
    // if (userResponse != null) {
    //   if (userResponse.access_token != null) {
    //     if (typeof (Storage) !== 'undefined') {
    //       const data = {
    //         token: userResponse.access_token,
    //         // userId: userResponse.user_id,
    //         // userRoles: userResponse.roles,
    //         // userName: userResponse.user_name
    //       };
    //       localStorage.setItem('youpi_authdata', JSON.stringify(data));
    //     }
    //   }
    // }

    this.blockUIService.hideSpinner();
    return response.json();
  }

  public uploadImage(url: string, formData: FormData): Observable<any> {
    const uploadReq = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });

    return this._httpClinet.request(uploadReq);
  }
}
