export interface ISchoolCollege {
  _id: string;
  name: string;
  email: string;
  number: string;
  address: string;

  link: string;

  profilePicture: string;
  about: string;
  yearOfEstablishment: string;
  parentInstitution: string;

  modeOfStudy: string;

  admissionProcess: string;
  teacherCount: string;
  highestEducation: string;
  gender: IGender;
  typeOfEducation: string;

  facilities: string;
  competitions: string;
  events: string;
  interests: string;
  sportAndFitness: string;
  infrastructure: string;
  advancedFacilities: string;
}

export enum IGender {
  MALE = "male",
  FEMALE = "female",
}
