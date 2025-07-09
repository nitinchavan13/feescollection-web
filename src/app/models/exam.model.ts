export class Exam {
  public id: number;
  public title: string;
  public examDate: string;
  public isAllDayEvent: boolean;
  public startTime: string;
  public endTime: string;
  public totalMarks: number;
  public minPassingMarks: number;
  public duration: number;
}

export class ExamList {
  public todayExams: Exam[] = [];
  public pastExams: Exam[] = [];
  public upcomingExams: Exam[] = [];
}
