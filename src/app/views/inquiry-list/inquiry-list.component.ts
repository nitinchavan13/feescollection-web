import { Component, OnInit } from '@angular/core';
import { StudentEnquiryModel } from '../../models/student-enquiry.model';
import { HttpService } from '../../services/http.service';
import { API_ENDPOINTS } from '../../_api-endpoints';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit {

  allEnquiries: StudentEnquiryModel[] = [];
  filteredEnquiries: StudentEnquiryModel[] = [];
  maxSize = 10;
  bigTotalItems: number;
  bigCurrentPage = 1;

  constructor(private _httpService: HttpService,) { }

  ngOnInit(): void {
    this.getStudentEnquiries();
  }

  pageChanged(event: any): void {
    const endAt = event.page * 10;
    const startFrom = endAt - 10;
    this.filteredEnquiries = this.allEnquiries.slice(startFrom, endAt);
  }

  private getStudentEnquiries() {
    this._httpService.httpPost(API_ENDPOINTS.GET_STUDENT_ENQUIRY(), null, true).subscribe((data) => {
      this.bindData(data);
    });
  }

  private bindData(data: any) {
    this.allEnquiries = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const enquiry = new StudentEnquiryModel();
      enquiry.id = element.Id;
      enquiry.firstName = element.FirstName;
      enquiry.middleName = element.MiddleName;
      enquiry.lastName = element.LastName;
      enquiry.name = element.FirstName + ' ' + element.MiddleName + ' ' + element.LastName;
      enquiry.mobileNumber = element.MobileNumber;
      enquiry.emailId = element.EmailId;
      enquiry.aadharNumber = element.AadharNumber;
      enquiry.address = element.Address;
      enquiry.tenthMarks = element.TenthMarks;
      enquiry.twelthMarks = element.TwelthMarks;
      enquiry.otherEduName = element.OtherEduName;
      enquiry.otherEduMarks = element.OtherEduMarks;
      enquiry.enquiryDate = element.EnquiryDate;
      this.allEnquiries.push(enquiry);
    }
    this.bigTotalItems = this.allEnquiries.length;
    this.filteredEnquiries = this.allEnquiries.slice(0, 10);
  }

}
