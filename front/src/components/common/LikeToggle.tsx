import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import LikeIconOn from "../../assets/images/icons/icon_like_on.png"
import LikeIconOff from "../../assets/images/icons/icon_like_off.png"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikedOffCampaign, LikedOnCampaign } from "../../api/campaignApi";
import { GET_CAMPAIGNLIST, GET_DETAILCAMPAIGN } from "../../constant/queryKeys";

const LikeButton = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${LikeIconOff}) no-repeat 50% 50%/contain;
  transition: all .3s;
  &:hover {
    transform: scale(.9);
  }
  &.active {
    background-image: url(${LikeIconOn})
  }
`

interface LikePropsType{
  liked ?: Boolean;
  campaignId ?: number;
}

export default function LikeToggle({liked, campaignId} : LikePropsType) {
  const queryClient = useQueryClient();
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
  const handleOnChange = (campaignId: number) => {
    if (!liked!) {
      LikeCampaign.mutate(campaignId);
    } else {
      cancleLikeCampaign.mutate(campaignId);
    }
  }
  console.log(liked)
  return (
    <div>
      <LikeButton className={liked! ? "active" : ""} onClick={()=>handleOnChange(campaignId!)}></LikeButton>
      
    </div>
  )
}