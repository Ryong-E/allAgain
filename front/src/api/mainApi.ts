import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const axiosApi = (url: string | undefined, options: {} | undefined, contentType: string = "application/json") => {
  const defaultApi = axios.create({ 
    baseURL: url, 
    headers: {
      "Content-Type": contentType,
    },
    ...options 
  });
  return defaultApi;
};

const defaultApi = axiosApi(BASE_URL, undefined);

export const getMainFeedList = async () => {
  try {
    const response = await defaultApi.get("feeds");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getMainCampaignList = async () => {
  try {
    const response = await defaultApi.get("campaigns");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};