import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  IUser,
  ILoginResponse
} from "./types";

const BASE_URL = "https://dummyjson.com/";

const userApi  = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});


export const loginUser = async ({ email, password }: IUser) => {
  try {
    const response = await userApi.post<ILoginResponse>('auth/login', { email, password });
    return response.data;
  } catch (err: any) {
    throw Error(err.response.data.message);
  }
};




export async function UserLogin({ email, password }: IUser) {

  // React Query
  // const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
  //   axios.post("https://dummyjson.com/auth/login", {
  //       email,
  //       password
  //     }
  // ));

  // console.log(data);

  // return data;
  
}