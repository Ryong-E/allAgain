import { useMutation } from "@tanstack/react-query";
import {useState, useEffect} from "react";
import styled from "styled-components";
import { cancelParticipateCampaign, joinParticipateCampaign } from "../../api/campaignApi";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png"
import CheckIconWhite from "../../assets/images/icons/icon_check_wh.png"

const JoinCampaignBox = styled.div`
  margin-top: 10px;
  
  button {
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 70px;
    cursor:pointer;
    background: ${({theme}) => theme.colors.dasidaGreen};
    border: 2px solid transparent;
    color: ${({theme}) => theme.colors.white};
    font-size: 18px;
    
    i{
      display:inline-block;
      transition: width .3s, height .3s, background-image .3s, margin-right .3s;
      opacity:0;
      width:0;
      height:0;
      margin-right: 0;
      background:center center no-repeat;
      background-size: cover;
      background-image:  url(${CheckIconWhite}) ;
    }
    &.darkGreen{
      transition: background .3s, color .3s;
    }
    &.darkGreen:hover, &.darkGreen.active{
      background: ${({theme}) => theme.colors.white};
      color: ${({theme}) => theme.colors.dasidaGreen};
      border: 2px solid ${({theme}) => theme.colors.dasidaGreen};
      i{
        background-image:  url(${CheckIconGreen}) ;
        opacity:1;
        width:20px;
        height:20px;
        margin-right: 20px;
      }
    }
    &.bright{
      background : ${({theme}) => theme.colors.placeholder}
    }
    &.lightGreen{
      background : ${({theme}) => theme.colors.lightGreen}
    }
  }
`;

interface JoinProps {
  setIsJoin : React.Dispatch<React.SetStateAction<boolean>>;
  isJoin ?: Boolean;
  campaignId : number;
  status : String;
  startDate : String;
}
export default function CampaignIsJoin({setIsJoin, isJoin, campaignId, status, startDate}: JoinProps) {
  const joinCampaign = useMutation(joinParticipateCampaign) 
  const cancleCampaign = useMutation(cancelParticipateCampaign)

  const [year, month, date] = startDate.split("-");

  const handleJoinCampaign = (campaignId : number)=>{
    setIsJoin(prev => !prev);
    console.log(campaignId)
    if(!isJoin){
      joinCampaign.mutate(campaignId);
    }else{
      cancleCampaign.mutate(campaignId);
    }
    
  }


  return (
    <JoinCampaignBox>
      <button className={`${isJoin ? "active" : ""} ${status === "모집 마감" ? "bright" : status === "모집 예정" ? "lightGreen" : "darkGreen"}`} onClick={()=>{(status === "모집 중" && handleJoinCampaign(campaignId))}}>
        {status === "모집 중"?
          <>
          <i></i>캠페인 참여하기
          </>:
          status === "모집 예정"?
          <>
          {year}년 {month}월 {date}일 00시 00분에 모집을 시작합니다.
          </>:
          <>모집이 마감되었습니다.</>
        }
        </button>
    </JoinCampaignBox>
  )
}
