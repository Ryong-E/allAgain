import axios from "axios";
import { CommentItemType } from "../types/campaignTypes";

const BASE_URL = "http://localhost:5001";
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

interface CreateCommentType{
  campaignId: number;
  content: string;
  rootCommentId: number | null;
}

export const createComment = async ( data : CreateCommentType) => {
  try {
    const response = await campaignApi(APPLCATION_URLENCODED).post(`/campaigns/campaign/comments`, data);
    return response.data;
  } catch (err: any) {
    // throw new Error("리스트 못가져옴..");
    console.log(err);
    
  }
};