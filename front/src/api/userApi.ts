import axios from "axios";
import {
  IUser,
  ILoginResponse,
  IUserResponse,
  IRegisterRequiredParams,
  IRegisterResponse
} from "./types";

const BASE_URL = "http://localhost:5001/users/";

const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});


export const createUser = async ({ email, password, passwordConfirm, name, nickname }: IRegisterRequiredParams) => {
  try {
    const response = await userApi.post<IRegisterResponse>('register', { email, password, passwordConfirm, name, nickname });
    console.log(response);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const loginUser = async ({ email, password }: IUser) => {
  try {
    const response = await userApi.post<ILoginResponse>('login', { email, password });
    return response.data;
  } catch (err: any) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
};

export const getUserProfile = async ({ nickname }: IUser) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}${nickname}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};