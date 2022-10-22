import axios from "axios";
import { CommentItemType } from "../types/campaignTypes";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;
const APPLCATION_JSON = "application/json";
const APPLCATION_URLENCODED = "application/x-www-form-urlencoded";

const commentApi = (contentType: string = APPLCATION_JSON) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType,
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
    },
  });

interface CreateCommentType {
  campaignId?: number;
  feedId?: number;
  content: string;
  rootCommentId: number | null;
  pathname: String;
}

export const createCommentApi = async ({
  campaignId,
  feedId,
  content,
  rootCommentId,
  pathname,
}: CreateCommentType) => {
  try {
    if (pathname === "campaign") {
      const response = await commentApi(APPLCATION_URLENCODED).post(
        `/campaigns/campaign/comments`,
        { campaignId, content, rootCommentId }
      );
      return response.data;
    } else {
      const response = await commentApi(APPLCATION_URLENCODED).post(
        `/feeds/feed/comments`,
        { feedId, content, rootCommentId }
      );
      return response.data;
    }
  } catch (err: any) {
    throw new Error("리스트 못가져옴..");
  }
};

interface DeleteCommentType {
  commentId: number;
  pathname: String;
}

export const deleteCommentApi = async ({
  commentId,
  pathname,
}: DeleteCommentType) => {
  try {
    console.log({ commentId, pathname });
    if (pathname === "campaign") {
      const response = await commentApi(APPLCATION_URLENCODED).delete(
        `/campaigns/campaign/${commentId}`
      );
      return response.data;
    } else {
      const response = await commentApi(APPLCATION_URLENCODED).delete(
        `/feeds/feed/${commentId}`
      );
      return response.data;
    }
  } catch (err: any) {
    throw new Error("리스트 못가져옴..");
  }
};
