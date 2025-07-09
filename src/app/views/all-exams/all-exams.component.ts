import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Exam, ExamList } from '../../models/exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { API_ENDPOINTS } from '../../_api-endpoints';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss']
})
export class AllExamsComponent implements OnInit {
  modalRef?: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: "small-model"
  };
  examModel: Exam;
  examList: ExamList = new ExamList();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalService: BsModalService,
    private _httpService: HttpService,
    private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this._httpService.httpPost(API_ENDPOINTS.GET_EXAM_LIST(), null, true).subscribe((data) => {
      if (data) {
        this.examList.todayExams = data.TodayExams;
        this.examList.pastExams = data.PastExams;
        this.examList.upcomingExams = data.UpcomingExams;
      }
    });
  }

  createNewExam(template: TemplateRef<any>) {
    this.examModel = new Exam();
    this.examModel.isAllDayEvent = true;
    this.modalRef = this._modalService.show(template, this.config);
  }

  saveExam(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    const newExam = new Exam();
    newExam.title = form.value.title;
    newExam.examDate = form.value.examDate;
    newExam.isAllDayEvent = form.value.isAllDayEvent;
    if (!form.value.isAllDayEvent) {
      newExam.startTime = form.value.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      newExam.endTime = form.value.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      newExam.duration = Math.ceil((form.value.endTime - form.value.startTime) / 60000);
    }
    newExam.totalMarks = form.value.totalMarks;
    newExam.minPassingMarks = form.value.minPassingMarks;
    console.log(form.value);

    this._httpService.httpPost(API_ENDPOINTS.CREATE_EXAM(), newExam, true).subscribe((id) => {
      form.resetForm();
      this.modalRef.hide();
      this.viewExamQuestion(id);
    }, (err) => {
      this._notificationService.showError(err);
    });
  }

  viewExamQuestion(id = 0) {
    this._router.navigate(['exam-details/' + id], { relativeTo: this._activatedRoute });
  }
}
