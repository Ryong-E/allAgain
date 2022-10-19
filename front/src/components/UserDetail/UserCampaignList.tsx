import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { getCampaignList } from "../../api/campaignApi";
import { loggedInUserId } from "../../atoms/atoms";

interface UserCampaignListProps {
  isLike?: boolean;
  isMyDetail?: boolean;
  userId: string;
}

function UserCampaignList({
  isLike,
  isMyDetail,
  userId,
}: UserCampaignListProps) {
  const currentUserId = useRecoilValue(loggedInUserId);
}
