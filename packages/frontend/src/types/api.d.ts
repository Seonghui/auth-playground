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
}

export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface IPlace {
  title: string;
  description: string;
  image?: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
}

export interface IPlaceResponse {
  places: IPlace[];
}

export interface IPlaceInput {
  title: string;
  description: string;
  image?: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}
