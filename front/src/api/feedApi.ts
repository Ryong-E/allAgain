import axios from "axios";
import { CreateFeedType, FeedType, ImageUrlType } from "../types/feedTypes";

const BASE_FEED_URL = "http://localhost:5001/feeds/";
const BASE_IMAGE_URL = "http://localhost:5001/images/";
const APPLCATION_JSON = "application/json";
const MULTIPART_FORM_DATA = "multipart/form-data";
const TEST_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJpYXQiOjE2NjU3MTQyMDB9.CAPudY_kZD6HmwiZgwFbL9ov4lxvWOOf7QtU38wHf8";

const feedApi = (contentType: string = APPLCATION_JSON) =>
  axios.create({
    baseURL: contentType === APPLCATION_JSON ? BASE_FEED_URL : BASE_IMAGE_URL,
    headers: {
      "Content-Type": contentType,
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  });

export const getFeedList = async () => {
  try {
    const response = await feedApi().get<FeedType[]>("");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getFeed = async (feedId: number) => {
  try {
    const response = await feedApi().get<FeedType>(`${feedId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getFeedByUserId = async (userId: string) => {
  try {
    const response = await feedApi().get<FeedType[]>(`user/${userId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const deleteFeed = async (feedId: number) => {
  try {
    const response = await feedApi().delete(`${feedId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createFeed = async ({
  category,
  tags,
  imageUrls,
  description,
}: CreateFeedType) => {
  try {
    const response = await feedApi().post<string>("", {
      category,
      tags,
      imageUrls,
      description,
      datetime: new Date().toJSON(),
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updateFeed = async ({
  feedId,
  userId,
  category,
  tags,
  imageUrls,
  description,
}: FeedType) => {
  try {
    const response = await feedApi().put(`${feedId}`, {
      feedId,
      userId,
      category,
      tags,
      imageUrls,
      description,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const uploadFeedImages = async (formData: FormData) => {
  try {
    const response = await feedApi(MULTIPART_FORM_DATA).post<ImageUrlType[]>(
      "feeds",
      formData
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
