//User Response
export interface UserNicknameRes {
  nickname: string;
}

export interface UserImageUrlRes {
  imageUrl: string;
}

export interface UserDefaultRes extends UserNicknameRes, UserImageUrlRes {
  name: string;
}

export interface UserLoginRes extends UserDefaultRes {
  userId: number;
  token: string;
}

export interface UserFollowsType {
  count: number;
  users: FollowType[];
}

export interface FollowType extends UserNicknameRes, UserImageUrlRes {
  userId: number;
}

export interface UserInfoRes extends UserDefaultRes {
  NumberOfFeeds: number;
  followed: boolean;
  followers: UserFollowsType;
  followees: UserFollowsType;
}

export interface UserMyInfoRes extends UserDefaultRes {
  email: string;
}

//User Request
interface Email {
  email: string;
}
interface Password {
  password: string;
}
interface PasswordConfirm {
  paswordConfirm: string;
}
interface Nickname {
  nickname: string;
}

export interface LoginParams extends Email, Password {}

export interface RegisterParams extends LoginParams, PasswordConfirm, Nickname {
  name: string;
}

export interface OnlyUserIdParam {
  userId: string;
}

export interface UpdateProfileParams
  extends Password,
    PasswordConfirm,
    Nickname,
    OnlyUserIdParam {
  currentPassword: string;
}

export interface UpdateProfileImageParams extends OnlyUserIdParam {
  image: FormData;
}
