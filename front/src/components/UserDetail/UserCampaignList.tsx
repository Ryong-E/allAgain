import { useQueries, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getCampaignListByUserId,
  getCampaignListParticipated,
  getCampaignListLiked,
} from "../../api/campaignApi";
import { loggedInUserId } from "../../atoms/atoms";
import { CampaignItemType } from "../../types/campaignTypes";
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
  const [options, setOptions] = useState<OptionType>({
    participated: true,
    hold: true,
  });

  const { isSuccess: likeSuccess, data: likeData } = useQuery(
    [isLike],
    getCampaignListLiked,
    {
      enabled: isLike,
    }
  );

  const { isSuccess: partSuccess, data: partData } = useQuery(
    [options, isMyDetail],
    getCampaignListParticipated,
    {
      enabled: isMyDetail,
    }
  );

  const { isSuccess: holdSuccess, data: holdData } = useQuery([options], () =>
    getCampaignListByUserId(userId, currentUserId)
  );

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
        {isLike &&
          likeSuccess &&
          likeData!.map((props: CampaignItemType) => (
            <CampaignItem
              {...props}
              key={`${props.writer.nickname}` + Date.now() + props.campaignId}
            />
          ))}
        {options.hold &&
          holdSuccess &&
          holdData!.map((props: CampaignItemType) => (
            <CampaignItem
              {...props}
              key={`${props.writer.nickname}` + Date.now() + props.campaignId}
            />
          ))}
        {options.participated && partSuccess && options.hold
          ? partData!
              .filter(({ writer }) => writer.userId !== currentUserId)
              .map((props: CampaignItemType) => (
                <CampaignItem
                  {...props}
                  key={
                    `${props.writer.nickname}` + Date.now() + props.campaignId
                  }
                />
              ))
          : partData!.map((props: CampaignItemType) => (
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
