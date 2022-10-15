import axios from "axios";
import { ICreateFeed, IFeed, IImageUrl } from "../types/feedTypes";

const BASE_URL = "http://localhost:5001/feeds/";
const APPLICATION_JSON = "application/json";
const MULTIPART_FORM_DATA = "multipart/form-data";
const TEST_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJpYXQiOjE2NjU3MTQyMDB9.CAPudY_kZD6HmwiZgwIfbL9ov4lxvWOOf7QtU38wHf8";

const feedApi = (contentType: string = APPLICATION_JSON) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType,
      Authorization: TEST_TOKEN,
    },
  });

export const getFeedList = async () => {
  try {
    const response = await feedApi().get<IFeed[]>("");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getFeed = async (feedId: number) => {
  try {
    const response = await feedApi().get<IFeed>(`${feedId}`);
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
}: ICreateFeed) => {
  try {
    const response = await feedApi().post<string>("", {
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

export const updateFeed = async ({
  feedId,
  userId,
  category,
  tags,
  imageUrls,
  description,
}: IFeed) => {
  try {
    const response = await feedApi().put("", {
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
    const response = await feedApi(MULTIPART_FORM_DATA).post<IImageUrl[]>(
      "images",
      formData
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
