import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import LikeIconOn from "../../assets/images/icons/icon_like_on.png";
import LikeIconOff from "../../assets/images/icons/icon_like_off.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikedOffCampaign, LikedOnCampaign } from "../../api/campaignApi";
import { GET_CAMPAIGNLIST, GET_DETAILCAMPAIGN } from "../../constant/queryKeys";
import { useRecoilValue } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";

const LikeButton = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${LikeIconOff}) no-repeat 50% 50% / contain;
  transition: all 0.3s;
  &:hover {
    transform: scale(0.9);
  }
  &.active {
    background-image: url(${LikeIconOn});
  }
`;

interface LikePropsType {
  liked?: Boolean;
  campaignId?: number;
}

export default function LikeToggle({ liked, campaignId }: LikePropsType) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loggedInUserId);

  const LikeCampaign = useMutation(LikedOnCampaign, {
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
      queryClient.invalidateQueries([GET_DETAILCAMPAIGN]);
    },
  });
  const cancleLikeCampaign = useMutation(LikedOffCampaign, {
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
      queryClient.invalidateQueries([GET_DETAILCAMPAIGN]);
    },
  });
  const handleClickLike = (campaignId: number) => {
    if (!liked!) {
      LikeCampaign.mutate(campaignId);
    } else {
      cancleLikeCampaign.mutate(campaignId);
    }
  };
  const handleClickLoginLink = () => {
    if (window.confirm("로그인 후 이용 가능합니다.\n로그인 하시겠습니까?")) {
      navigate(ROUTE.LOGIN.link);
    }
  };
  return (
    <div>
      <LikeButton
        className={liked! ? "active" : ""}
        onClick={() => {
          isLogin !== null
            ? handleClickLike(campaignId!)
            : handleClickLoginLink();
        }}></LikeButton>
    </div>
  );
}
