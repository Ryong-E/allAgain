import axios from "axios";
import { CampaignItemType, CreateCampaignType } from "../types/campaignTypes";

const BASE_URL = "http://localhost:5001/campaigns";
const APPLCATION_JSON = "application/json";
const APPLCATION_URLENCODED = "application/x-www-form-urlencoded";


const campaignApi = (contentType: string = APPLCATION_JSON) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType,
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
});

const campaignNoTokenApi = (contentType: string = APPLCATION_JSON) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType,
    },
});

export const getCampaignList = async () => {
  try {
    const response = await campaignApi().get<CampaignItemType[]>("");
    return response.data;
  } catch (err: any) {
    // throw new Error("리스트 못가져옴..");
    console.log(err);
    
  }
};

export const getCampaignItem = async (campaginId: number) => {
  try {
    const response = await campaignApi().get<CampaignItemType>(
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
          Authorization: "Bearer " + localStorage.getItem('jwtToken'),
        },
      }
    );
    return response;
  } catch (err: any) {
    throw new Error("사진 업로드 실패");
  }
};

export const createCampaign = async (formData: FormData) => {
  try {
    const response = await axios.post("http://localhost:5001/campaigns", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem('jwtToken'),
      },
    });
  } catch (err: any) {
    throw new Error("캠페인 생성 실패");
  }
};

export const updateCampaign = async ({formData,campaignId}: CreateCampaignType) => {
  try {
    const response = await axios.put(`http://localhost:5001/campaigns/${campaignId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
  } catch (err: any) {
    throw new Error("캠페인 수정 실패");
  }
};

export const deleteCampaignItem = async (campaignId: number) => {
  try {
    const response = await campaignApi(APPLCATION_URLENCODED).delete(`/${campaignId}`, {
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
    const response = await campaignApi(APPLCATION_URLENCODED).post(
      `/${campaignId}/participants`, {campaignId}
    );
    return response.data;
  } catch (err: any) {
    throw new Error("캠페인 참여 안됨...");
  }
};
export const cancelParticipateCampaign = async (campaignId: number) => {
  try {
    const response = await campaignApi(APPLCATION_URLENCODED).delete(
      `/${campaignId}/participants`,{
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