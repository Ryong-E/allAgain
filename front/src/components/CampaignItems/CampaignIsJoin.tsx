import {useState, useEffect} from "react";
import styled from "styled-components";

const JoinCampaignBox = styled.div`
  margin-top: 10px;
  button {
    width: 100%;
    height: 70px;
    cursor:pointer;
    background: ${({theme}) => theme.colors.dasidaGreen};
    color: ${({theme}) => theme.colors.white};
    font-size: 18px;
  }
`;
export default function CampaignIsJoin() {
  const [isJoin, setIsJoin] = useState(false)
  return (
    <JoinCampaignBox>
      <button className={isJoin ? "active" : ""} onClick={()=>{setIsJoin(prev => !prev)}}>캠페인 참여하기</button>
    </JoinCampaignBox>
  )
}
