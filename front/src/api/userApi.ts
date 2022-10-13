import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  IUser,
  ILoginResponse,
  IUserResponse
} from "./types";

const BASE_URL = "http://localhost:5001/users/";
const userApi  = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});


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
    const response = await userApi.get<IUserResponse>(`${nickname}`);
    return response.data;
  } catch (err: any) {
    throw new Error("유저정보 조회 실패");
  }
};