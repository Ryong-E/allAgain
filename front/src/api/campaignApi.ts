import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export type CampaignItemType = {
  campaignId: number;
  title: String;
  content: String;
  thumbnail?: String | null;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  campaignStartDate: Date;
  campaignEndDate: Date;
  recruitmentNumber: number;
  participantsCount: number;
  introduce: String;
  status: String;
  writer: {
    userId: number;
    nickname: String;
    imageUrl?: String;
  };
  participated: Boolean;
};


const TOKEN = localStorage.getItem("jwtToken");
const BASE_URL = "http://localhost:5001/campaigns";
const campaignApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + TOKEN,
  },
});
const campaignUrlencodedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + TOKEN,
  },
});


export const getCampaignList = async () => {
  try {
    const response = await campaignApi.get<CampaignItemType[]>("");
    return response.data;
  } catch (err: any) {
    throw new Error("리스트 못가져옴..");
  }
};

export const getCampaignItem = async (campaginId: number) => {
  try {
    const response = await campaignApi.get<CampaignItemType>(
      `/campaign/${campaginId}`
    );
    return response.data;
  } catch (err: any) {
    throw new Error("아이템 못가져옴..");
  }
};
export const insertImage = async (data: FormData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/campaigns/images",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + TOKEN,
        },
      }
    );
    return response;
  } catch (err: any) {
    throw new Error("사진 업로드 실패");
  }
};

export const createCampaign = async (data: FormData) => {
  try {
    const response = await axios.post("http://localhost:5001/campaigns", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + TOKEN,
      },
    });
  } catch (err: any) {
    throw new Error("캠페인 생성 실패");
  }
};

export const updateCampaign = async (data: FormData) => {
  try {
    const response = await axios.put("http://localhost:5001/campaigns", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + TOKEN,
      },
    });
  } catch (err: any) {
    throw new Error("캠페인 수정 실패");
  }
};

export const deleteCampaignItem = async (campaignId: number) => {
  try {
    const response = await campaignUrlencodedApi.delete(`/${campaignId}`, {
      data: {
        campaignId,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error("삭제 실패..");
  }
};


export const joinParticipateCampaign = async (campaignId: number) => {
  try {
    const response = await campaignUrlencodedApi.post(
      `/participants`, {campaignId}
    );
    return response.data;
  } catch (err: any) {
    throw new Error("캠페인 참여 안됨...");
  }
};
export const cancelParticipateCampaign = async (campaignId: number) => {
  try {
    const response = await campaignUrlencodedApi.delete(
      `/participants`,{
        data :{
          campaignId
        }
      }
    );
    return response.data;
  } catch (err: any) {
    throw new Error("캠페인 탈퇴 안됨...");
  }
};