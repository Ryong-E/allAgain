import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GenericResponse, ILoginRequiredParams, ILoginResponse, IUserResponse } from "./types";

const BASE_URL = "http://localhost:5001/users/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';


export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>('auth/refresh');
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes('not logged in') && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn(); // 새 액세스 토큰을 검색하기 위해 GET 요청을 수행
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const loginUserFn = async (user: ILoginRequiredParams) => {
  const response = await authApi.post<ILoginResponse>('login', user);
  return response.data;
};