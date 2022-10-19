import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  cancelParticipateCampaign,
  joinParticipateCampaign,
} from "../../api/campaignApi";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png";
import CheckIconWhite from "../../assets/images/icons/icon_check_wh.png";
import { loggedInUserId } from "../../atoms/atoms";
import { GET_DETAILCAMPAIGN } from "../../constant/queryKeys";
import { ROUTE } from "../../constant/route";

const JoinCampaignBox = styled.div`
  margin-top: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.dasidaGreen};
    border: 2px solid transparent;
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;

    i {
      display: inline-block;
      transition: width 0.3s, height 0.3s, background-image 0.3s,
        margin-right 0.3s;
      opacity: 0;
      width: 0;
      height: 0;
      margin-right: 0;
      background: center center no-repeat;
      background-size: cover;
      background-image: url(${CheckIconWhite});
    }
    &.darkGreen {
      transition: background 0.3s, color 0.3s;
    }
    &.darkGreen:hover,
    &.darkGreen.active {
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.dasidaGreen};
      border: 2px solid ${({ theme }) => theme.colors.dasidaGreen};
      i {
        background-image: url(${CheckIconGreen});
        opacity: 1;
        width: 20px;
        height: 20px;
        margin-right: 20px;
      }
    }
    &.bright {
      background: ${({ theme }) => theme.colors.placeholder};
    }
    &.lightGreen {
      background: ${({ theme }) => theme.colors.lightGreen};
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.placeholder};
    }
  }
`;

interface JoinProps {
  isJoin: Boolean;
  campaignId: number;
  status: String;
  startDate: String;
  isSameUser: Boolean;
  isSameRate: number;
}
export default function CampaignIsJoin({
  isJoin,
  campaignId,
  status,
  startDate,
  isSameUser,
  isSameRate,
}: JoinProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const joinCampaign = useMutation(joinParticipateCampaign, {
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_DETAILCAMPAIGN]);
    },
  });
  const cancleCampaign = useMutation(cancelParticipateCampaign, {
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_DETAILCAMPAIGN]);
    },
  });
  const [year, month, date] = startDate.split("-");
  const isLogin = useRecoilValue(loggedInUserId);
  const fullOfCampaign = isSameRate === 0 && !isJoin;
  const handleJoinCampaign = (campaignId: number) => {
    if (!isJoin) {
      joinCampaign.mutate(campaignId);
    } else {
      cancleCampaign.mutate(campaignId);
    }
  };
  const handleClickLoginLink = ()=>{
    navigate(ROUTE.LOGIN.link)
  }
  const statusClass =
    status === "모집 마감"
      ? "bright"
      : status === "모집 예정"
      ? "lightGreen"
      : fullOfCampaign
      ? ""
      : "darkGreen";
  const isClickPossible =
    status === "모집 중" && !isSameUser && isLogin !== null;
  const isGuest = isLogin === null ? "guestJoin" : "";
  return (
    <JoinCampaignBox>
      <button
        className={`${isJoin ? "active" : ""} ${statusClass} ${isGuest}`}
        onClick={() => {
          isClickPossible && handleJoinCampaign(campaignId);
          (status === "모집 중" && isLogin === null) && handleClickLoginLink();
        }}
        disabled={fullOfCampaign}>
        {status === "모집 중" ? (
          <>
            {fullOfCampaign ? (
              <>남은 자리가 없네요..</>
            ) : isLogin === null ? (
              <>로그인 후 이용해 주세요</>
            ) : (
              <>
                <i></i>캠페인 참여하기
              </>
            )}
          </>
        ) : status === "모집 예정" ? (
          <>
            {year}년 {month}월 {date}일 00시 00분에 모집을 시작합니다.
          </>
        ) : (
          <>모집이 마감되었습니다.</>
        )}
      </button>
    </JoinCampaignBox>
  );
}
