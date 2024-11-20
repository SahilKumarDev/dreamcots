export interface ITeacher {
  _id: string;
  name: string;
  email: string;
  number: string;
  address: string;
  experience: string;
  qualification: string;
  profilePicture: string;
  schoolOrCollege: string;
  teachingSubject: string;
  teachingLanguage: string;

  gender: IGender;
  coaching: ICoaching;
}

export enum IGender {
  MALE = "male",
  FEMALE = "female",
}

export enum ICoaching {
  YES = "yes",
  NO = "no",
}
