import {useState, useEffect} from "react";
import styled from "styled-components";
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
    border: 2px solid ${({theme}) => theme.colors.dasidaGreen};
    color: ${({theme}) => theme.colors.white};
    font-size: 18px;
    transition: background .3s, color .3s;
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
    &:hover, &.active{
      background: ${({theme}) => theme.colors.white};
      color: ${({theme}) => theme.colors.dasidaGreen};
      i{
        background-image:  url(${CheckIconGreen}) ;
        opacity:1;
        width:20px;
        height:20px;
        margin-right: 20px;
      }
    }
  }
`;

interface PropsType {
  setIsJoin : React.Dispatch<React.SetStateAction<boolean>>;
  isJoin ?: Boolean;
}
export default function CampaignIsJoin({setIsJoin, isJoin}: PropsType) {
  
  return (
    <JoinCampaignBox>
      <button className={isJoin ? "active" : ""} onClick={()=>{setIsJoin(prev => !prev)}}><i></i>캠페인 참여하기</button>
    </JoinCampaignBox>
  )
}