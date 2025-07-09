export class UserModel {
  Id: number;
  UserName: string;
  AcademicYearId: number;

  constructor(userId, userName, academicId) {
    this.Id = userId;
    this.UserName = userName;
    this.AcademicYearId = academicId;
  }
}
