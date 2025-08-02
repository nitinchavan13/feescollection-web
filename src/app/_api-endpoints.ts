import { environment } from "../environments/environment";

export const API_ENDPOINTS = {
  BASE_URL: environment.apiEndPoint,
  LOGIN() {
    return this.BASE_URL + 'auth/login';
  },
    GET_ACADEMIC_YEARS() {
    return this.BASE_URL + 'auth/academicYears';
  },
  GET_DASHBOARD_CARDS() {
    return this.BASE_URL + 'dashboard/getDashboardCards';
  },
  GET_EXPENCES() {
    return this.BASE_URL + 'expences/getExpences';
  },
  SAVE_EXPENCE() {
    return this.BASE_URL + 'expences/addExpence';
  },
  UPDATE_EXPENCE() {
    return this.BASE_URL + 'expences/editExpence';
  },
  DELETE_EXPENCE() {
    return this.BASE_URL + 'expences/deleteExpence';
  },
  GET_STUDENTS() {
    return this.BASE_URL + 'student/getStudents';
  },
  SAVE_STUDENT() {
    return this.BASE_URL + 'student/addStudent';
  },
  UPDATE_STUDENT() {
    return this.BASE_URL + 'student/editStudent';
  },
  DELETE_STUDENT(studentId: number, academicYearId: number) {
    return this.BASE_URL + 'student/deleteStudent/' + studentId + '/' + academicYearId;
  },
  GET_STUDENT_DETAILS(studentId: number) {
    return this.BASE_URL + 'student/getStudentDetails/' + studentId;
  },
  SAVE_STUDENT_FEES(studentId: number) {
    return this.BASE_URL + 'student/addStudentFees/' + studentId;
  },
  UPDATE_STUDENT_FEES(studentId: number) {
    return this.BASE_URL + 'student/editStudentFees/' + studentId;
  },
  GET_STUDENT_ENQUIRY() {
    return this.BASE_URL + 'enquiry/getStudentEnquiry';
  },
  GET_EXAM_LIST() {
    return this.BASE_URL + 'exam/getExamsForAdmin';
  },
  GET_EXAM_DETAILS(examId: number) {
    return this.BASE_URL + 'exam/getExamDetailsForAdmin/' + examId;
  },
  GET_EXAM_QUESTIONS(examId: number) {
    return this.BASE_URL + 'exam/getExamQuestions/' + examId;
  },
  CREATE_EXAM() {
    return this.BASE_URL + 'exam/createNewExam';
  },
  CREATE_QUESTION(examId: number) {
    return this.BASE_URL + 'exam/createQuestion/' + examId;
  },
}
