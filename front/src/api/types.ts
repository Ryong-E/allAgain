export interface User {
  id?: string,
  email?: string,
  password?: string,
  name?: string,
  nickname?: string,
  image_url?: string,
  token?: string
}

export interface MyProfile {
  email: string,
  name: string,
  nickname: string,
  image_url: string,
}

export interface RegisterRequiredParams {
  email: string,
  password: string,
  passwordConfirm: string,
  name: string,
  nickname: string,
}

export interface RegisterResponse {
  status: string;
}

export interface LoginRequiredParams {
  email: string,
  password: string
}

export interface LoginResponse {
  status: string;
  access_token: string;
  data: {
    user: User;
  };
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
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



