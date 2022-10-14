import axios from "axios";

const BASE_URL = "http://localhost:5001/";

const axiosApi = (url: string, options: {} | undefined) => {
  const defaultApi = axios.create({ 
    baseURL: url, 
    headers: {
      "Content-Type": "application/json"
    },
    ...options 
  });
  return defaultApi;
};

const axiosAuthApi = (url: string, options: {} | undefined) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…3MTd9.LngRE15GDZ40eORAHdzh4cqVL58N_zXskfX--IjC1MU";
  const authApi = axios.create({
    baseURL: url,
    headers: { 
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token 
    },
    ...options,
  });
  return authApi;
};

export const defaultApi = axiosApi(BASE_URL, undefined);
export const authApi = axiosAuthApi(BASE_URL, undefined);