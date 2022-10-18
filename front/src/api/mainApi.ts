import { authApi } from "./authApi";

export const getMainFeedList = async () => {
  try {
    const response = await authApi.get("feeds");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getMainCampaignList = async () => {
  try {
    const response = await authApi.get("campaigns");
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};