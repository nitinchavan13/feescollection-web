import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Question } from '../../models/question.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { API_ENDPOINTS } from '../../_api-endpoints';
import { NotificationService } from '../../services/notification.service';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {
  modalRef?: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: "small-model"
  };
  questionModel: Question;
  questionList: Question[] = [];
  totalQuestionMarks = 0;
  examId = 0;
  examDetails: Exam;

  constructor(private _router: Router,
    private _routeParams: ActivatedRoute,
    private _modalService: BsModalService,
    private _httpService: HttpService,
    private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this._routeParams.params.subscribe((data) => {
      this.examId = data.id;
      this.fetchExamDetails();
      this.fetchQuestions();
    });
  }

  fetchExamDetails() {
    this.examDetails = new Exam();
    this._httpService.httpPost(API_ENDPOINTS.GET_EXAM_DETAILS(this.examId), null, true).subscribe((data) => {
      if (data) {
        this.examDetails.title = data.Title;
        this.examDetails.totalMarks = data.TotalMarks;
        this.examDetails.isAllDayEvent = data.IsAllDayEvent;
        this.examDetails.duration = data.Duration;
        this.examDetails.endTime = data.EndTime;
        this.examDetails.examDate = data.ExamDate;
        this.examDetails.id = data.Id;
        this.examDetails.minPassingMarks = data.MinPassingMarks;
        this.examDetails.startTime = data.StartTime;
      }
    });
  }

  fetchQuestions() {
    this.questionList = [];
    this._httpService.httpPost(API_ENDPOINTS.GET_EXAM_QUESTIONS(this.examId), null, true).subscribe((data) => {
      if (data && data.length > 0) {
        this.totalQuestionMarks = 0;
        data.forEach(element => {
          const model = new Question().map(element.Id, element.QuestionText, element.Option1, element.Option2, element.Option3, element.Option4, element.CorrectOption, element.MarkPerQuestion);
          this.totalQuestionMarks = this.totalQuestionMarks + model.markPerQuestion;
          this.questionList.push(model);
        });
      }
    });
  }

  gotoList() {
    this._router.navigate(['all-exams']);
  }

  addQuestion(template: TemplateRef<any>) {
    this.questionModel = new Question();
    this.modalRef = this._modalService.show(template, this.config);
  }

  saveQuestion(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    var totalMarks = this.totalQuestionMarks + form.value.markPerQuestion;
    if (totalMarks > this.examDetails.totalMarks) {
      this._notificationService.showWarning("Total question Marks are greater than total exam marks.")
    } else {
      const newQuestion = new Question();
      newQuestion.questionText = form.value.questionText;
      newQuestion.option1 = form.value.option1;
      newQuestion.option2 = form.value.option2;
      newQuestion.option3 = form.value.option3;
      newQuestion.option4 = form.value.option4;
      newQuestion.correctOption = form.value.correctOption;
      newQuestion.markPerQuestion = form.value.markPerQuestion;
      // this._httpService.httpPost(API_ENDPOINTS.CREATE_QUESTION(this.examId), newQuestion, true).subscribe((id) => {
      //   form.resetForm();
      //   this.modalRef.hide();
      //   this.fetchQuestions();
      // }, (err) => {
      //   this._notificationService.showError(err);
      // });
    }
  }

  updateCorrectOption(eve) {
    var allElements = document.querySelectorAll(".correct-option-highlight");
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove('correct-option-highlight');
    }
    document.getElementById(eve.target.value).classList.add("correct-option-highlight");
  }
}
