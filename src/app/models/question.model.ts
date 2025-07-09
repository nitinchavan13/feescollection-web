export class Question {
  public id: number;
  public questionText: string;
  public option1: string;
  public option2: string;
  public option3: string;
  public option4: string;
  public correctOption: string;
  public markPerQuestion: number;

  constructor() { }

  map(id, qText, o1, o2, o3, o4, corOpt, mark) {
    const model = new Question();
    model.id = id;
    model.questionText = qText;
    model.option1 = o1;
    model.option2 = o2;
    model.option3 = o3;
    model.option4 = o4;
    model.correctOption = corOpt;
    model.markPerQuestion = mark;
    return model;
  }
}
