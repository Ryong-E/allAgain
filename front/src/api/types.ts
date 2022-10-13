export interface IUser {
  id?: string,
  email?: string,
  password?: string,
  name?: string,
  nickname?: string,
  image_url?: string,
  token?: string
}

export interface ILoginRequiredParams {
  email?: string,
  password?: string
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

