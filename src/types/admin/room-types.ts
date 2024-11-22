export interface IRoom {
  _id: string;

  // Page One
  number: string;

  // Page Two
  name: string;
  email: string;
  gender: IGender;
  dob: string;
  profession: string;
  profilePicture: string;

  // Page Three
  address: string;

  // Payment
  status: IStatus;
  
  // Page Four
  whoIsUsing: IWhoIsUsing;

  // Room
  roomPrice: string;
  roomType: string;
  roomMember: string;
  roomImage: string;
}

export enum IGender {
  MALE = "male",
  FEMALE = "female",
}

export enum IStatus {
  PENDING = "pending",
  APPROVED = "approved",
}

export enum IWhoIsUsing {
  OWNER = "owner",
  RENTER = "renter",
}
 