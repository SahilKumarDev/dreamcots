export interface ITeam {
  name: string;
  logo: string;
  plan: string;
}

export enum EPlan {
  FREE = "Free",
  PREMIUM = "Premium",
  PRO = "Pro",
}


export interface Team {
  _id?: string;
  name: string;
  logo: string;
  plan: string;
}
