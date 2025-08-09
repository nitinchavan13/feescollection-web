import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Student } from '../../models/student.model';
import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { NotificationService } from '../../services/notification.service';
import { API_ENDPOINTS } from '../../_api-endpoints';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  allStudents: Student[] = [];
  filteredStudents: Student[] = [];

  maxSize = 10;
  bigTotalItems: number;
  bigCurrentPage = 1;

  modalRef?: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: "large-model"
  };
  student: Student;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _notificationService: NotificationService,
    private _modalService: BsModalService,
    private _storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  pageChanged(event: any): void {
    const endAt = event.page * 10;
    const startFrom = endAt - 10;
    this.filteredStudents = this.allStudents.slice(startFrom, endAt);
  }

  private bindData(data: any) {
    this.allStudents = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const student = new Student();
      student.displayId = index + 1;
      student.id = element.Id;
      student.name = element.FirstName + ' ' + element.LastName;
      student.firstName = element.FirstName;
      student.middleName = element.MiddleName;
      student.lastName = element.LastName;
      student.mobileNumber = element.MobileNumber;
      student.emailId = element.EmailId;
      student.course = element.CourseName;
      student.address = element.Address;
      student.paidFees = element.TotalPaidFees;
      student.race = element.Race;
      student.cast = element.Cast;
      student.gender = element.Gender;
      student.birthdate = element.Birthdate;
      student.qualification = element.Qualification;
      student.aadharNumber = element.AadharNumber;
      student.panNumber = element.PanNumber;
      student.isHavingHeavyLicence = element.IsHavingHeavyLicence;
      student.profilePic = environment.domainUrl + "/" + element.ProfilePic;
      student.profilePicBytes = element.ProfilePicBytes;
      this.allStudents.push(student);
    }
    this.bigTotalItems = this.allStudents.length;
    this.filteredStudents = this.allStudents.slice(0, 10);
  }

//   getImageSrcFromBytes(bytes: number[]): string {
//   if (!bytes) return '';
//   const binary = new Uint8Array(bytes).reduce((data, byte) => data + String.fromCharCode(byte), '');
//   return 'data:image/jpeg;base64,' + btoa(binary);
// }

getImageSrcFromBytes(base64: string): string {
  if (!base64) return '';
  return 'data:image/jpeg;base64,' + base64;
}

  private getStudents() {
    this._httpService.httpPost(API_ENDPOINTS.GET_STUDENTS(), null, true).subscribe((data) => {
      this.bindData(data);
    });
  }

  viewDetails(studentId: number) {
    this._router.navigate(['student-details/' + studentId], { relativeTo: this._activatedRoute });
  }

  addStudent(template: TemplateRef<any>) {
    this.student = new Student();
    this.student.courseId = 1;
    this.student.gender = 'male';
    this.student.isHavingHeavyLicence = false;
    this.config.class = 'large-model';
    this.modalRef = this._modalService.show(template, this.config);
  }

  // saveStudent(form: NgForm) {
  //   if (form.invalid) {
  //     return false;
  //   }
  //   const newStudent = new Student();
  //   newStudent.firstName = form.value.firstName;
  //   newStudent.middleName = form.value.middleName;
  //   newStudent.lastName = form.value.lastName;
  //   newStudent.mobileNumber = form.value.mobileNumber;
  //   newStudent.emailId = form.value.emailId;
  //   newStudent.address = form.value.address;
  //   newStudent.courseId = 1;//form.value.courseId;
  //   newStudent.race = form.value.race;
  //   newStudent.cast = form.value.cast;
  //   newStudent.gender = form.value.gender;
  //   newStudent.birthdate = form.value.birthdate;
  //   newStudent.qualification = form.value.qualification;
  //   newStudent.aadharNumber = form.value.aadharNumber;
  //   newStudent.panNumber = form.value.panNumber;
  //   newStudent.isHavingHeavyLicence = form.value.heavyLicence;

  //   this._httpService.httpPost(API_ENDPOINTS.SAVE_STUDENT(), newStudent, true).subscribe((data) => {
  //     this.bindData(data);
  //     form.resetForm();
  //     this.student = new Student();
  //     this.modalRef.hide();
  //   }, (err) => {
  //     this._notificationService.showError(err);
  //   });
  // }

  saveStudent(form: NgForm) {
  if (form.invalid) {
    return false;
  }
  const formData = new FormData();
  formData.append('firstName', form.value.firstName);
  formData.append('middleName', form.value.middleName);
  formData.append('lastName', form.value.lastName);
  formData.append('mobileNumber', form.value.mobileNumber);
  formData.append('emailId', form.value.emailId);
  formData.append('address', form.value.address);
  formData.append('courseId', '1');
  formData.append('race', form.value.race);
  formData.append('cast', form.value.cast);
  formData.append('gender', form.value.gender);
  formData.append('birthdate', form.value.birthdate.toLocaleDateString('en-GB'));
  formData.append('qualification', form.value.qualification);
  formData.append('aadharNumber', form.value.aadharNumber);
  formData.append('panNumber', form.value.panNumber);
  formData.append('isHavingHeavyLicence', form.value.isHavingHeavyLicence);
  if (this.student.profilePicFile) {
    formData.append('profilePic', this.student.profilePicFile);
  }

  this._httpService.httpPostMultipart(API_ENDPOINTS.SAVE_STUDENT(), formData).subscribe((data) => {
    this.bindData(data);
    form.resetForm();
    this.student = new Student();
    this.modalRef.hide();
  }, (err) => {
    this._notificationService.showError(err);
  });
}

  searchForStudent(event) {
    const filterValue = event.target.value;
    if (filterValue !== '') {
      this.filteredStudents = this.allStudents.filter(x => x.name.toLowerCase().includes(filterValue.toLowerCase()));
    } else {
      this.filteredStudents = this.allStudents;
    }
  }

  editStudent(template: TemplateRef<any>, student: Student) {
    this.student = new Student();
    this.student.id = student.id;
    this.student.firstName = student.firstName;
    this.student.middleName = student.middleName;
    this.student.lastName = student.lastName;
    this.student.mobileNumber = student.mobileNumber;
    this.student.emailId = student.emailId;
    this.student.address = student.address;
    this.student.race = student.race;
    this.student.cast = student.cast;
    this.student.gender = student.gender;
    this.student.birthdate = new Date(student.birthdate);
    this.student.qualification = student.qualification;
    this.student.aadharNumber = student.aadharNumber;
    this.student.panNumber = student.panNumber;
    this.student.isHavingHeavyLicence = student.isHavingHeavyLicence;
    this.student.profilePic = student.profilePic;
    this.student.profilePicBytes = student.profilePicBytes;
    this.student.courseId = 1;
    this.config.class = 'large-model';
    this.modalRef = this._modalService.show(template, this.config);
  }

  updateStudent(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    const newStudent = new Student();
    newStudent.id = this.student.id;
    newStudent.firstName = form.value.firstName;
    newStudent.middleName = form.value.middleName;
    newStudent.lastName = form.value.lastName;
    newStudent.mobileNumber = form.value.mobileNumber;
    newStudent.emailId = form.value.emailId;
    newStudent.address = form.value.address;
    newStudent.race = form.value.race;
    newStudent.cast = form.value.cast;
    newStudent.gender = form.value.gender;
    newStudent.birthdate = form.value.birthdate;
    newStudent.qualification = form.value.qualification;
    newStudent.aadharNumber = form.value.aadharNumber;
    newStudent.panNumber = form.value.panNumber;
    newStudent.isHavingHeavyLicence = form.value.isHavingHeavyLicence;
    newStudent.courseId = form.value.courseId;
    this._httpService.httpPost(API_ENDPOINTS.UPDATE_STUDENT(), newStudent, true).subscribe((data) => {
      this.bindData(data);
      form.resetForm();
      this.modalRef.hide();
    }, (err) => {
      this._notificationService.showError(err);
    });
  }

  calculateAge(dateString) { // a date on string "22/10/1988
    let age: number;
    if (dateString) {
      var timeDiff = Math.abs(Date.now() - dateString.getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    this.student.age = age;
  }

  deleteStudentConfirm(template: TemplateRef<any>, student: Student) {
    this.student = new Student();
    this.student = student;
    this.config.class = 'small-model';
    this.modalRef = this._modalService.show(template, this.config);
  }

  deleteStudent() {
    const userInfo = this._storageService.getUserInfo();
    if (userInfo) {
      this._httpService.httpPost(API_ENDPOINTS.DELETE_STUDENT(this.student.id, userInfo.AcademicYearId), null, true).subscribe((data) => {
        this._modalService.hide();
        this.bindData(data);
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.student.profilePicFile = file; // Store the file object
      this.student.profilePic = ''; // Reset the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.student.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
