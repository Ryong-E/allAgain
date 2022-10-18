import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_API_URL;

// const axiosApi = (url: string | undefined, options: {} | undefined, contentType: string = "application/json") => {
//   const defaultApi = axios.create({ 
//     baseURL: url, 
//     headers: {
//       "Content-Type": contentType,
//     },
//     ...options 
//   });
//   return defaultApi;
// };

// const axiosAuthApi = (url: string | undefined, options: {} | undefined, contentType: string= "application/json") => {
//   const token = localStorage.getItem("jwtToken");
//   const authApi = axios.create({
//     baseURL: url,
//     headers: { 
//       "Content-Type": contentType,
//       Authorization: 'Bearer ' + token 
//     },
//     ...options,
//   });
//   return authApi;
// };

// export const defaultApi = axiosApi(BASE_URL, undefined);
// export const authApi = axiosAuthApi(BASE_URL, undefined);