export interface IUser {
  id?: string,
  email?: string,
  password?: string,
  name?: string,
  nickname?: string,
  image_url?: string,
  token?: string
}

export interface IRegisterRequiredParams {
  email: string,
  password: string,
  passwordConfirm: string,
  name: string,
  nickname: string,
}

export interface IRegisterResponse {
  status: string;
}

export interface ILoginRequiredParams {
  email: string,
  password: string
}

export interface ILoginResponse {
  status: string;
  access_token: string;
  data: {
    user: IUser;
  };
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface GenericResponse {
  status: string;
  message: string;
}

// export interface ILoginResponse {
//   status: string;
//   access_token: string;
// }

// export interface IUserResponse {
//   status: string;
//   data: {
//     user: IUser;
//   };
// }



