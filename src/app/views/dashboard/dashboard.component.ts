import { Component, OnInit } from '@angular/core';
import { DashboardCard } from '../../models/dashcard.model';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import { API_ENDPOINTS } from '../../_api-endpoints';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dashboardCard: DashboardCard = new DashboardCard();
  remaniningAmount = 0;

  constructor(
    private _httpService: HttpService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._httpService.httpPost(API_ENDPOINTS.GET_DASHBOARD_CARDS(), null, true).subscribe((data) => {
      if (data) {
        this.dashboardCard = new DashboardCard();
        this.dashboardCard.totalStudents = data.TotalStudents;
        this.dashboardCard.totalCredit = data.TotalCredit;
        this.dashboardCard.totalDebit = data.TotalDebit;
        this.remaniningAmount = this.dashboardCard.totalCredit - this.dashboardCard.totalDebit;
      }
    }, (err) => {
      this._notificationService.showError(err);
    });
  }
}
