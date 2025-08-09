export class FinalExamDetail {
    public studentName: string;
    public studentProfileImage: string;
    public instituteName: string;
    public prnNumber: string;
    public dateOfAdmission: string;
    public dateOfCompletion: string;
    public courseName: string;
    public courseDuration: string;
    public status: string;
    public result: ResultData[];
    public obtainedMarks: number;
    public totalMarks: number;
}
export class ResultData {
    public subjectName: string;
    public marksObtained: number;
    public totalMarks: number;
}
