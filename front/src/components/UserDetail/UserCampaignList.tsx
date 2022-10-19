import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getCampaignListByUserId } from "../../api/campaignApi";
import { loggedInUserId } from "../../atoms/atoms";
import CampaignItem from "../CampaignItems/CampaignItem";

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
  const { isSuccess, data } = useQuery(["userCampaign"], () =>
    getCampaignListByUserId(userId, currentUserId)
  );

  return (
    <CampaignItemContainer>
      {isSuccess &&
        data!.map((props) => (
          <CampaignItem
            {...props}
            key={`${props.writer.nickname}` + Date.now() + props.campaignId}
          />
        ))}
    </CampaignItemContainer>
  );
}

const CampaignItemContainer = styled.div`
  margin-top: 130px;
`;

export default UserCampaignList;
