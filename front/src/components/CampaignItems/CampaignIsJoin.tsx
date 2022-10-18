import {  useMutation, useQueryClient } from "@tanstack/react-query";
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
    &:disabled{
      background: ${({theme}) => theme.colors.placeholder};
    }
  }
`;

interface JoinProps {
  isJoin : Boolean;
  campaignId : number;
  status : String;
  startDate : String;
  isSameUser: Boolean;
  isSameRate: number;
}
export default function CampaignIsJoin({isJoin, campaignId, status, startDate, isSameUser, isSameRate}: JoinProps) {
  const queryClient = useQueryClient();
  const joinCampaign = useMutation(joinParticipateCampaign, {
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries(["detailCampaign"]);;
    }
  }) 
  const cancleCampaign = useMutation(cancelParticipateCampaign, {
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries(["detailCampaign"]);;
    }
  })
  const [year, month, date] = startDate.split("-");
  const fullOfCampaign = ((isSameRate === 0) && !isJoin);
  console.log(isJoin)
  const handleJoinCampaign = (campaignId : number)=>{
    if(!isJoin){
      joinCampaign.mutate(campaignId);
    }else{
      cancleCampaign.mutate(campaignId);
    }
  }
  console.log(isJoin) 
  const statusClass = status === "모집 마감" ? "bright" : status === "모집 예정" ? "lightGreen" : fullOfCampaign ? "" : "darkGreen";

  return (
    <JoinCampaignBox>
      <button className={`${isJoin ? "active" : ""} ${statusClass}`} onClick={()=>{((status === "모집 중" && !isSameUser) && handleJoinCampaign(campaignId)); }} disabled={fullOfCampaign}>
        {status === "모집 중"?
          <>
          {fullOfCampaign ? 
          <>
          남은 자리가 없네요..
          </>:
          <>
            <i></i>캠페인 참여하기
          </> 
          }
          </>
          :
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
