import axios from "axios";
import { CampaignItemType, CreateCampaignType } from "../types/campaignTypes";

const BASE_URL = "http://localhost:5001/";
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
export const LikedOnCampaign = async (campaignId: number) => {
  try {
    const response = await campaignApi(APPLCATION_URLENCODED).post(
      `campaigns/${campaignId}/likes`,
      { campaignId }
    );
    return response.data;
  } catch (err: any) {
    throw new Error("좋아요 안됨...");
  }
};
export const LikedOffCampaign = async (campaignId: number) => {
  try {
    const response = await campaignApi(APPLCATION_URLENCODED).delete(
      `campaigns/${campaignId}/likes`,
      {
        data: {
          campaignId,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    throw new Error("좋아요 취소 안됨...");
  }
};