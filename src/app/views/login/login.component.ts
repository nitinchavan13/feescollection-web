import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { LoginService } from '../../services/login/login.service';
import { NotificationService } from '../../services/notification.service';
import { API_ENDPOINTS } from '../../_api-endpoints';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    private _notificationService: NotificationService,
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private storageServ: LocalStorageService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      academicYear: ['', Validators.required]
    });
  }

  loginUser() {
    const obj = {
      MobileNumber: this.loginForm.controls.username.value,
      Password: this.loginForm.controls.password.value,
      AcademicYearId: this.loginForm.controls.academicYear.value
    };
    this._httpService.httpPost(API_ENDPOINTS.LOGIN(), obj, true).subscribe((data) => {
      this._notificationService.showSuccess('Welcome back');
      this._loginService.setLoggedInState(true);
      this.storageServ.setUserInfo(data);
      this._router.navigate(['/dashboard']);
    }, (error) => {
      this._notificationService.showError(error.Message);
    });
  }
}
