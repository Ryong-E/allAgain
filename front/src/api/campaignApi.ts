import axios from "axios";
// export interface CampaignItem{
//   id : number;
//   campaignId : number;
//   title : String;
//   content : String;
//   thumbnail : File[];
//   recruitmentStartDate : Date;
//   recruitmentEndDate : Date;
//   campaignStartDate : Date;
//   campaignEndDate : Date;
//   recruitmentNumber : number;
//   introduce : String;
//   status : String;
//   writer : {
//     nickname : String;
//     imageUrl : String;
//   }
  
// }


// export interface UpdateItem{

// }

// export interface DeleteItem{
//   campaignId : number;
// }

// import {
//   CampaignItem,
//   UpdateItem,
//   DeleteItem
// } from "./types";

// const BASE_URL = "http://localhost:5001/campaigns/";
// const userApi  = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json"
//   },
// });


// // export const createCampaignItem = async (data:CreateItem) => {
// //   try {
// //     const response = await userApi.post<CreateItem>(data);
// //     console.log(response);
// //     return response.data;
// //   } catch (err: any) {
// //     throw new Error("생성 실패..");
// //   }
// // };

// // export const getCampaignList = async (data:GetList) => {
// //   try {
// //     const response = await userApi.get<GetList>(data);
// //     return response.data;
// //   } catch (err: any) {
// //     throw new Error("리스트 못가져옴..");
// //   }
// // };

// export const getCampaignItem = async (data:CampaignItem) => {
//   try {
//     const response = await userApi.get<CampaignItem>(`:campaginId`,data);
//     return response.data;
//   } catch (err: any) {
//     throw new Error("아이템 못가져옴..");
//   }
// };



// // export const updateCampaignItem = async (data:UpdateItem) => {
// //   try {
// //     const response = await userApi.put<UpdateItem>(data);
// //     return response.data;
// //   } catch (err: any) {
// //     throw new Error("업데이트 실패..");
// //   }
// // };

// export const deleteCampaignItem = async ({campaignId}:DeleteItem) => {
//   try {
//     const response = await userApi.delete<DeleteItem>(`:campaginId`,{campaignId});
//     return response.data;
//   } catch (err: any) {
//     throw new Error("삭제 실패..");
//   }
// };
