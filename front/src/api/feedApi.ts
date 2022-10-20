import axios from "axios";
import { CreateFeedType, FeedType, ImageUrlType } from "../types/feedTypes";

const BASE_FEED_URL = process.env.REACT_APP_BASE_API_URL + "/feeds/";
const BASE_IMAGE_URL = process.env.REACT_APP_BASE_API_URL + "/images/";
const APPLCATION_JSON = "application/json";
const MULTIPART_FORM_DATA = "multipart/form-data";

const feedApi = (contentType: string = APPLCATION_JSON) =>
  axios.create({
    baseURL: contentType === APPLCATION_JSON ? BASE_FEED_URL : BASE_IMAGE_URL,
    headers: {
      "Content-Type": contentType,
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
    },
  });

function dateFormat(date: Date) {
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();
  let second: number | string = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );
}

export const getFeedList = async () => {
  try {
    const response = await feedApi().get<FeedType[]>("");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getFeedListAuthorized = async () => {
  try {
    const response = await feedApi().get<FeedType[]>("all");
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

export const getFeedLikedByUserId = async (userId: number) => {
  try {
    const response = await feedApi().get<FeedType[]>(`user/${userId}/likes`);
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
    const datetime = dateFormat(new Date());
    const response = await feedApi().post<string>("", {
      category,
      tags,
      imageUrls,
      description,
      datetime,
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

interface LikeId {
  likeId: number;
}

export const createLike = async (feedId: number, userId: number) => {
  try {
    const response = await feedApi().post<LikeId>("likes", {
      feedId,
      userId,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const deleteLike = async (likeId: number) => {
  try {
    const response = await feedApi().delete<string>(`likes/${likeId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createComment = async (
  feedId: number,
  content: string,
  rootCommentId: number | null
) => {
  try {
    const response = await feedApi().post<string>("feed/comments", {
      feedId,
      content,
      rootCommentId,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updateComment = async (commentId: number, content: string) => {
  try {
    const response = await feedApi().put<string>(`feed/${commentId}`, {
      content,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    await feedApi().put(`feed/${commentId}`);
  } catch (err: any) {
    throw new Error(err.message);
  }
};
