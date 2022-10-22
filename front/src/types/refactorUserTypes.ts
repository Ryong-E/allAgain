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
