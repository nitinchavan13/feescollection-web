import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Expence } from '../../models/expence.model';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import { API_ENDPOINTS } from '../../_api-endpoints';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expence-list',
  templateUrl: './expence-list.component.html',
  styleUrls: ['./expence-list.component.scss']
})
export class ExpenceListComponent implements OnInit {
  allExpences: Expence[] = [];
  filteredExpences: Expence[] = [];
  currentMonthExpences: Expence[] = [];

  maxSize = 10;
  bigTotalItems: number;
  bigCurrentPage = 1;

  modalRef?: BsModalRef;
  expence: Expence;

  currentMonth = 0;
  currentMonthExpence = 0;

  constructor(
    private _modalService: BsModalService,
    private _httpService: HttpService,
    private _notificationService: NotificationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getExpences();
    this.currentMonth = new Date().getMonth();
  }

  getExpences() {
    this._httpService.httpPost(API_ENDPOINTS.GET_EXPENCES(), null, true).subscribe((data) => {
      this.bindData(data);
    });
  }

  bindData(data: any) {
    this.allExpences = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const expence = new Expence();
      expence.id = element.Id;
      expence.expenceAmount = element.ExpenceAmount;
      expence.expenceDate = this.datePipe.transform(new Date(element.ExpenceDate), 'yyyy-MM-dd').substring(0, 10);
      expence.expenceType = element.ExpenceType;
      expence.expenceNote = element.ExpenceNote;
      this.allExpences.push(expence);
    }
    this.getCurrentMonthData();
    this.bigTotalItems = this.currentMonthExpences.length;
    this.filteredExpences = this.currentMonthExpences.slice(0, 10);
  }

  pageChanged(event: any): void {
    const endAt = event.page * 10;
    const startFrom = endAt - 10;
    this.filteredExpences = this.currentMonthExpences.slice(startFrom, endAt);
  }

  addNewExpence(template: TemplateRef<any>) {
    this.expence = new Expence();
    this.modalRef = this._modalService.show(template);
  }

  saveExpence(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    const newExpence = new Expence();
    newExpence.expenceAmount = form.value.expAmount;
    newExpence.expenceDate = form.value.expDate;
    newExpence.expenceType = form.value.expType;
    newExpence.expenceNote = form.value.expNote;
    this._httpService.httpPost(API_ENDPOINTS.SAVE_EXPENCE(), newExpence, true).subscribe((data) => {
      this.bindData(data);
      form.resetForm();
      this.modalRef.hide();
    }, (err) => {
      this._notificationService.showError(err);
    });
  }

  onValueChange() {
    this.getCurrentMonthData();
    this.bigTotalItems = this.currentMonthExpences.length;
    this.filteredExpences = this.currentMonthExpences.slice(0, 10);
  }

  private getCurrentMonthData() {
    this.currentMonthExpences = this.allExpences.filter(
      x => x.expenceDate && new Date(x.expenceDate).getMonth() == this.currentMonth
    );
    if (this.currentMonthExpences.length > 0) {
      this.currentMonthExpence = this.currentMonthExpences.map(a => a.expenceAmount).reduce(function (a, b) {
        return a + b;
      });
    } else {
      this.currentMonthExpence = 0;
    }
  }

  editExpence(template: TemplateRef<any>, expence: Expence) {
    this.expence = new Expence();
    this.expence.id = expence.id;
    this.expence.expenceAmount = expence.expenceAmount;
    this.expence.expenceDate = expence.expenceDate;
    this.expence.expenceNote = expence.expenceNote;
    this.expence.expenceType = expence.expenceType;
    this.modalRef = this._modalService.show(template);
  }

  updateExpence(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    const expence = new Expence();
    expence.id = this.expence.id;
    expence.expenceAmount = form.value.expAmount;
    expence.expenceDate = form.value.expDate;
    expence.expenceType = form.value.expType;
    expence.expenceNote = form.value.expNote;
    this._httpService.httpPost(API_ENDPOINTS.UPDATE_EXPENCE(), expence, true).subscribe((data) => {
      this.bindData(data);
      form.resetForm();
      this.modalRef.hide();
    }, (err) => {
      this._notificationService.showError(err);
    });
  }

  deleteExpence(expenceObj: Expence) {
    Swal.fire('Are you sure?', "You won't be able to revert this!", "warning").then((result) => {
      if (result.value) {
        const expence = new Expence();
        expence.id = expenceObj.id;
        this._httpService.httpPost(API_ENDPOINTS.DELETE_EXPENCE(), expence, true).subscribe((data) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.bindData(data);
        }, (err) => {
          this._notificationService.showError(err);
        });
      }
    })
  }
}
