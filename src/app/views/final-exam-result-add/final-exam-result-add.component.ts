import { Component, OnInit } from '@angular/core';
import { FinalExamDetail } from '../../models/final-exam-detail.model';
import { CONSTANTS } from '../../_constants';

@Component({
  selector: 'app-final-exam-result-add',
  templateUrl: './final-exam-result-add.component.html',
  styleUrls: ['./final-exam-result-add.component.scss']
})
export class FinalExamResultAddComponent implements OnInit {
  finalExamDetail: FinalExamDetail = new FinalExamDetail();
  constructor() { }

  ngOnInit(): void {
    // Initialize the finalExamDetail object with default values if needed
    this.finalExamDetail.studentName = 'KHADPE PRANAV SUNIL';
    this.finalExamDetail.studentProfileImage = 'https://web.ieduptraining.in/Upload/7x3ytqllKAHDPE%20PARNAV%20SUNIL.jpg';
    this.finalExamDetail.instituteName = CONSTANTS.INSTITUTE_NAME;
    this.finalExamDetail.prnNumber = '';
    this.finalExamDetail.dateOfAdmission = '';
    this.finalExamDetail.dateOfCompletion = '';
    this.finalExamDetail.courseName = CONSTANTS.COURSE_NAME;
    this.finalExamDetail.courseDuration = CONSTANTS.COURSE_DURATION;
    this.finalExamDetail.status = 'Passed';
    this.finalExamDetail.result = [
      { subjectName: CONSTANTS.SUBJECT_1, marksObtained: 0, totalMarks: 100 },
      { subjectName: CONSTANTS.SUBJECT_2, marksObtained: 0, totalMarks: 100 },
      { subjectName: CONSTANTS.SUBJECT_3, marksObtained: 0, totalMarks: 100 },
      { subjectName: CONSTANTS.SUBJECT_4, marksObtained: 0, totalMarks: 100 }
    ];
    this.finalExamDetail.obtainedMarks = 0;
    this.finalExamDetail.totalMarks = 400; // Assuming total marks for all subjects is 400
  }

  calculateObtainedMarks() {
    if (this.finalExamDetail && Array.isArray(this.finalExamDetail.result)) {
      this.finalExamDetail.obtainedMarks = this.finalExamDetail.result
        .reduce((sum, res) => sum + (Number(res.marksObtained) || 0), 0);
    }
  }

}
