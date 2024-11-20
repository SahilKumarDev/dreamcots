 

export interface ITeacher {
  _id: string;
  name: string;
  uniqueName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  coaching: ITeacherCoaching;
  skills: string[];
  yearsOfExperience: string;
  isFullTime: boolean;
  emergencyContact: number;
  gender: ITeacherGender;
  teachingSubjects: string[];
  highestQualification: string;
  teachingSchoolOrCollege: string;
  languages: string[];
  socialMedia: string[];
  highestTeachingClassOrDegree: string;
  address: IAddress;
}
 
export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ITeacherCoaching {
  isCoaching: boolean;
  location: string;
  fees: number;
  time: string;
}
 
export enum ITeacherGender {
  MALE = "male",
  FEMALE = "female",
}
