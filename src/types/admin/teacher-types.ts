import { Document } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  uniqueName: string;
  email: string;
  phoneNumber: number;
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
  availability: ITeacherAvailability;
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

export enum ITeacherAvailability {
  PART = "part time",
  FULL = "full time",
}

export enum ITeacherGender {
  MALE = "male",
  FEMALE = "female",
}
