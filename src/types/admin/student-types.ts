export interface IStudent {
  _id: string;
  name: string;
  email: string;
  age: string;
  number: string;
  address: string;
  qualification: string;
  profilePicture: string;
  schoolOrCollege: string;
  gender: IGender;
}

export enum IGender {
  MALE = "male",
  FEMALE = "female",
}
