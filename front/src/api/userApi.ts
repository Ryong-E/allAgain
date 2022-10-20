import axios from "axios";
import {
  User,
  LoginResponse,
  UserResponse,
  RegisterRequiredParams,
  RegisterResponse,
  MyProfileEditParams,
  UserInfoResponse,
} from "../types/userTypes";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 회원가입
export const createUser = async ({
  email,
  password,
  passwordConfirm,
  name,
  nickname,
}: RegisterRequiredParams) => {
  try {
    const { data } = await userApi.post<RegisterResponse>("/users", {
      email,
      password,
      passwordConfirm,
      name,
      nickname,
    });
    return data;
  } catch (err: any) {
    throw err.response;
  }
};

// 로그인
export const loginUser = async ({ email, password }: User) => {
  try {
    const { data } = await userApi.post<LoginResponse>("/users/login", {
      email,
      password,
    });
    return data;
  } catch (err: any) {
    throw err.response;
  }
};

// 나의 계정프로필 조회
export const getUserProfile = async () => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    const { data } = await axios({
      method: "get",
      url: `${BASE_URL}/users/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (err: any) {
    throw err.response;
  }
};

// 나의 계정프로필 수정
export const updateUserProfile = async ({
  userId,
  nickname,
  currentPassword,
  password,
  passwordConfirm,
}: MyProfileEditParams) => {
  console.log(userId);
  try {
    const token = sessionStorage.getItem("jwtToken");
    const { data } = await axios({
      method: "put",
      url: `${BASE_URL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        nickname,
        currentPassword,
        password,
        passwordConfirm,
      },
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data.errorMessage);
    throw err.response;
  }
};

// 프로필이미지 수정
export const updateUserImage = async ({ userId, formData }: any) => {
  try {
    const token = sessionStorage.getItem("jwtToken");

    const { data } = await axios.post(
      `${BASE_URL}/users/${userId}/profile/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

// 회원 탈퇴
export const deleteUser = async ({ userId }: User) => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    await axios({
      method: "delete",
      url: `${BASE_URL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      sessionStorage.removeItem("jwtToken");
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getUserProfileById = async (userId: string,currentUserId : number | null) => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    if(currentUserId){
      const { data } = await axios<UserInfoResponse>({
        method: "get",
        url: `${BASE_URL}/users/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
    else{
      const { data } = await axios<UserInfoResponse>({
        method: "get",
        url: `${BASE_URL}/users/${userId}/guest`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    }
  } catch (err: any) {
    throw err.response;
  }
};
