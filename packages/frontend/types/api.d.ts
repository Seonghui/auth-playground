export interface IRegisterInput {
  username: string;
  password: string;
  email: string;
}

export interface ILoginInput {
  password: string;
  email: string;
}

export interface IUser {
  token: string;
  email: string;
  username: string;
}
