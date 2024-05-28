export interface IRegisterInput {
  username: string;
  password: string;
  email: string;
}

export interface ILoginInput {
  password: string;
  email: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
}
