import { Component, OnInit } from '@angular/core';
import { FinalExamResultList } from '../../models/final-exam-list.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-final-exam-result-list',
  templateUrl: './final-exam-result-list.component.html',
  styleUrls: ['./final-exam-result-list.component.scss']
})
export class FinalExamResultListComponent implements OnInit {

  maxSize = 10;
  bigTotalItems: number;
  bigCurrentPage = 1;

  resultList: FinalExamResultList[] = [
    { studentName: 'John Doe', qrCodeLink: 'https://example.com/qr1' },
    { studentName: 'Jane Smith', qrCodeLink: 'https://example.com/qr2' },
    { studentName: 'Alice Johnson', qrCodeLink: 'https://example.com/qr3' }
    // Add more sample data as needed
  ]; // This should be replaced with the actual type of your result list

  constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _httpService: HttpService,
        private _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  pageChanged(event: any): void {
    const endAt = event.page * 10;
    const startFrom = endAt - 10;
  }

  addDetails(studentId: number) {
    this._router.navigate(['add-details/' + studentId], { relativeTo: this._activatedRoute });
  }


}
