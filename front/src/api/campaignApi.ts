import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
export type CampaignItemType = {
  campaignId : number;
  title : String;
  content : String;
  thumbnail ?: String | null;
  recruitmentStartDate : Date;
  recruitmentEndDate : Date;
  campaignStartDate : Date;
  campaignEndDate : Date;
  recruitmentNumber : number;
  introduce : String;
  status : String;
  writer : {
    nickname : String;
    imageUrl ?: String;
  };
}


export interface UpdateItem{

}

export interface DeleteItem{
  campaignId : number;
}

// import {
//   CampaignItem,
//   UpdateItem,
//   DeleteItem
// } from "./types";
const TEST_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJpYXQiOjE2NjU3MTQyMDB9.CAPudY_kZD6HmwiZgwIfbL9ov4lxvWOOf7QtU38wHf8';
const BASE_URL = "http://localhost:5001/campaigns";
const campaignApi  = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: TEST_TOKEN,
  },
});


// export const createCampaignItem = async (data:CreateItem) => {
//   try {
//     const response = await userApi.post<CreateItem>(data);
//     console.log(response);
//     return response.data;
//   } catch (err: any) {
//     throw new Error("생성 실패..");
//   }
// };

export const getCampaignList = async () => {
  try {
    const response = await campaignApi.get<CampaignItemType[]>("");
    return response.data;
  } catch (err: any) {
    throw new Error("리스트 못가져옴..");
  }
};

export const getCampaignItem = async (campaginId:number)=> {
  try {
    const response = await campaignApi.get<CampaignItemType> (`/campaign/${campaginId}`);
    return response.data;
  } catch (err: any) {
    throw new Error("아이템 못가져옴..");
  }
};



// export const updateCampaignItem = async (data:UpdateItem) => {
//   try {
//     const response = await userApi.put<UpdateItem>(data);
//     return response.data;
//   } catch (err: any) {
//     throw new Error("업데이트 실패..");
//   }
// };

// export const deleteCampaignItem = async ({campaignId}:DeleteItem) => {
//   try {
//     const response = await userApi.delete<DeleteItem>(`:campaginId`,{campaignId});
//     return response.data;
//   } catch (err: any) {
//     throw new Error("삭제 실패..");
//   }
// };
