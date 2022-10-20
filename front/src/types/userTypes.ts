export interface User {
  userId?: any;
  email?: string;
  password?: string;
  name?: string;
  nickname?: string;
  imageUrl?: string;
  token?: string;
}

export interface MyProfile {
  email: string;
  name: string;
  nickname: string;
  imageUrl: string;
}

export interface MyProfileEditParams {
  userId?: number | null;
  nickname?: string;
  currentPassword?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface RegisterRequiredParams {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
}

export interface RegisterResponse {
  status: string;
}

export interface LoginRequiredParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: User;
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}

export interface UserInfoResponse {
  name: string;
  nickname: string;
  imageUrl: string;
  NumberOfFeeds:number;
  followed:boolean;
  followers:{
    count:number;
    users:[]
  };
  followees:{
    count:number;
    users:[]
  }
}
