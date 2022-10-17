import axios from "axios";
import {
  User,
  LoginResponse,
  UserResponse,
  RegisterRequiredParams,
  RegisterResponse,
  MyProfileEditParams,
} from "./types";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

console.log(BASE_URL);

const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});

// 회원가입
export const createUser = async ({ email, password, passwordConfirm, name, nickname }: RegisterRequiredParams) => {
  try {
    const { data } = await userApi.post<RegisterResponse>("register", { email, password, passwordConfirm, name, nickname });
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// 로그인
export const loginUser = async ({ email, password }: User) => {
  try {
    const { data } = await userApi.post<LoginResponse>("/login", { email, password });
    return data;
  } catch (err: any) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
};

// 나의 계정프로필 조회하기
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const { data } = await axios({
      method: 'get',
      url: `${BASE_URL}/users/informations/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
    });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};


// 나의 계정프로필 수정하기
export const updateUserProfile = async ({ nickname, currentPassword, password, passwordConfirm }: MyProfileEditParams) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const { data } = await axios({
      method: 'put',
      url: `${BASE_URL}/users/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      data: {
        nickname,
        currentPassword,
        password,
        passwordConfirm
      }
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data.errorMessage);
    throw err.response;
  }
};


export const updateUserImage = async ({ formData }: any) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const { data } = await axios.post(`${BASE_URL}/users/profile/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + token
      },
    });
    return data;

  } catch (err: any) {
    console.log(err);
    throw err;
  }
};


export const deleteUser = async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    await axios({
      method: 'delete',
      url: `${BASE_URL}/users`,
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
    })
    .then((res) => {
      localStorage.removeItem("jwtToken");
    });
  } catch (err: any) {
    throw new Error(err);
  }
};