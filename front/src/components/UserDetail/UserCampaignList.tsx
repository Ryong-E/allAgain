import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getCampaignListByUserId,
  getCampaignListParticipated,
  getCampaignListLiked,
} from "../../api/campaignApi";
import { loggedInUserId } from "../../atoms/atoms";
import CampaignItem from "../CampaignItems/CampaignItem";
import FeedAddButton from "../Feed/FeedAddButton";
import ListOptionCheckbox from "./ListOptionCheckbox";

interface UserCampaignListProps {
  isLike?: boolean;
  isMyDetail?: boolean;
  userId: string;
}

interface OptionType {
  participated: boolean;
  hold: boolean;
}

function UserCampaignList({
  isLike,
  isMyDetail,
  userId,
}: UserCampaignListProps) {
  const currentUserId = useRecoilValue(loggedInUserId);
  const res = useQueries({
    queries: [
      {
        queryKey: ["userCampaign"],
        queryFn: () => getCampaignListByUserId(userId, currentUserId),
      },
      {
        queryKey: ["participatedCampaign"],
        queryFn: () => getCampaignListParticipated(),
      },
      {
        queryKey: ["likedCampaign"],
        queryFn: () => getCampaignListLiked(),
      },
    ],
  });

  const [options, setOptions] = useState<OptionType>({
    participated: true,
    hold: true,
  });

  return (
    <>
      <ListContainer>
        <AddButtonContainer>
          {isMyDetail && (
            <AddPos>
              <FeedAddButton navLink="/campaign/add" />
            </AddPos>
          )}
        </AddButtonContainer>
        {isMyDetail && (
          <ListOptionCheckbox
            options={options}
            setOption={setOptions}
            isVisible={!isLike}
          />
        )}
      </ListContainer>
      <ItemContainer>
        {isLike ||
          (options.hold &&
            res &&
            res[0].isSuccess &&
            res[0].data!.map((props) => (
              <CampaignItem
                {...props}
                key={`${props.writer.nickname}` + Date.now() + props.campaignId}
              />
            )))}
        {isLike ||
          (isMyDetail &&
            options.participated &&
            res &&
            res[1].isSuccess &&
            res[1].data!.map((props) => (
              <CampaignItem
                {...props}
                key={`${props.writer.nickname}` + Date.now() + props.campaignId}
              />
            )))}
        {isLike &&
          res &&
          res[2].isSuccess &&
          res[2].data!.map((props) => (
            <CampaignItem
              {...props}
              key={`${props.writer.nickname}` + Date.now() + props.campaignId}
            />
          ))}
      </ItemContainer>
    </>
  );
}

const ListContainer = styled.div`
  width: 100%;
`;

const AddButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  align-items: center;
  display: flex;
`;

const AddPos = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
`;

const ItemContainer = styled.div`
  margin-top: 80px;
`;

export default UserCampaignList;
