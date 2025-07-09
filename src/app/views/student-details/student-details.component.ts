import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Student } from '../../models/student.model';
import { Transaction } from '../../models/transaction.model';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import { API_ENDPOINTS } from '../../_api-endpoints';
import { CONSTANTS } from '../../_constants';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  studentId: number;
  studentInfo: Student;
  collectedFees = 0;
  remainingFees = CONSTANTS.TOTAL_FEES;

  maxSize = 10;
  bigTotalItems: number;
  bigCurrentPage = 1;

  modalRef?: BsModalRef;
  feeModel: Transaction;

  constructor(
    private _router: Router,
    private _routeParams: ActivatedRoute,
    private _httpService: HttpService,
    private _notificationService: NotificationService,
    private _modalService: BsModalService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._routeParams.params.subscribe((data) => {
      this.studentId = data.id;
      this.getStudentDetails(this.studentId);
    });
  }

  gotoList() {
    this._router.navigate(['all-students']);
  }

  pageChanged(event: any): void {
    const endAt = event.page * 10;
    const startFrom = endAt - 10;
    this.filteredTransactions = this.allTransactions.slice(startFrom, endAt);
  }

  addTransaction(template: TemplateRef<any>) {
    this.feeModel = new Transaction();
    this.modalRef = this._modalService.show(template);
  }

  editTransaction(template: TemplateRef<any>, transaction: Transaction) {
    this.feeModel = new Transaction();
    this.feeModel.id = transaction.id;
    this.feeModel.paidAmount = transaction.paidAmount;
    this.feeModel.collectionDate = transaction.collectionDate;
    this.feeModel.note = transaction.note;
    this.modalRef = this._modalService.show(template);
  }

  getStudentDetails(studentId: number) {
    this._httpService.httpPost(API_ENDPOINTS.GET_STUDENT_DETAILS(studentId), null, true).subscribe((data) => {
      this.bindData(data);
    });
  }

  private bindData(data: any) {
    this.collectedFees = 0;
    this.remainingFees = 0;
    var studentInfo = data.StudentInfo;
    this.studentInfo = new Student();
    this.studentInfo.id = studentInfo.Id;
    this.studentInfo.name = studentInfo.FirstName + ' ' + studentInfo.LastName;
    this.studentInfo.mobileNumber = studentInfo.MobileNumber;
    this.studentInfo.emailId = studentInfo.EmailId;
    this.studentInfo.course = studentInfo.CourseName;
    this.studentInfo.paidFees = studentInfo.TotalPaidFees;

    this.allTransactions = [];
    var studentTransactions = data.StudentFees;
    if (studentTransactions) {
      for (let index = 0; index < studentTransactions.length; index++) {
        const element = studentTransactions[index];
        const transaction = new Transaction();
        transaction.id = element.Id;
        transaction.paidAmount = element.PaidAmount;
        transaction.collectionDate = this.datePipe.transform(new Date(element.CollectionDate), 'yyyy-MM-dd').substring(0, 10);
        transaction.note = element.Note;
        this.collectedFees += element.PaidAmount;
        this.allTransactions.push(transaction);
      }
    }
    this.remainingFees = CONSTANTS.TOTAL_FEES - this.collectedFees;
    this.bigTotalItems = this.allTransactions.length;
    this.filteredTransactions = this.allTransactions.slice(0, 10);
  }

  saveFees(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    const newTransaction = new Transaction();
    newTransaction.paidAmount = form.value.feeAmount;
    newTransaction.collectionDate = form.value.collectionDate;
    newTransaction.note = form.value.note;
    this._httpService.httpPost(API_ENDPOINTS.SAVE_STUDENT_FEES(this.studentId), newTransaction, true).subscribe((data) => {
      this.bindData(data);
      form.resetForm();
      this.modalRef.hide();
    }, (err) => {
      this._notificationService.showError(err);
    });
  }

  updateFees(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    const transaction = new Transaction();
    transaction.id = this.feeModel.id;
    transaction.paidAmount = form.value.feeAmount;
    transaction.collectionDate = form.value.collectionDate;
    transaction.note = form.value.note;
    this._httpService.httpPost(API_ENDPOINTS.UPDATE_STUDENT_FEES(this.studentId), transaction, true).subscribe((data) => {
      this.bindData(data);
      form.resetForm();
      this.modalRef.hide();
    }, (err) => {
      this._notificationService.showError(err);
    });
  }

  sendPaymentReminder() {
    let msgText = `कु. ` + this.studentInfo.name + ` सण २०२४-२५ या शैक्षणीक वर्षा करता मास्टर कॉलेज रत्नागिरी येते फायर अँड सेफ्टी या कोर्स करता आपला प्रवेश झाला असून कॉलेज फी आता पर्यंत ` + this.collectedFees + ` एवढी भरली आहे उर्वरित फी ` + this.remainingFees + ` असून दर महिन्याला ठरल्या प्रमाणे ५००० फी भरून सहकार्य करावे.

⏺️मास्टर फायर अँड सेफ्टी कॉलेज रत्नागिरी`;

    let url = 'https://api.whatsapp.com/send?phone=91' + this.studentInfo.mobileNumber + '&text=' + msgText;
    window.open(url, "_blank");
  }
}
