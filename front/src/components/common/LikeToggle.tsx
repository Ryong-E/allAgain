import styled from "styled-components";
import LikeIconOn from "../../assets/images/icons/icon_like_on.png";
import LikeIconOff from "../../assets/images/icons/icon_like_off.png";
import { useMutation } from "@tanstack/react-query";
import { LikedOffCampaign, LikedOnCampaign } from "../../api/likeApi";
import { useRecoilValue } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useEffect, useState } from "react";

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
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const isLogin = useRecoilValue(loggedInUserId);
  const [isActive, setIsActive] = useState<Boolean>(false);
  const LikeCampaign = useMutation(LikedOnCampaign);
  const cancleLikeCampaign = useMutation(LikedOffCampaign);
  const handleClickLike = (campaignId: number) => {
    if (LikeCampaign.isLoading || cancleLikeCampaign.isLoading) return;
    
    if (isActive) {
      setIsActive(false)
      cancleLikeCampaign.mutate(campaignId);
    } else {
      setIsActive(true)
      LikeCampaign.mutate(campaignId);
    }
  };
  const handleClickLoginLink = () => {
    if (window.confirm("로그인 후 이용 가능합니다.\n로그인 하시겠습니까?")) {
      navigate(ROUTE.LOGIN.link, {state : pathname});
    }
  };
  useEffect(()=>{
    setIsActive(liked!)
  },[])
  return (
    <div>
      <LikeButton
        className={isActive ? "active" : ""}
        onClick={() => {
          isLogin !== null
            ? handleClickLike(campaignId!)
            : handleClickLoginLink();
        }}></LikeButton>
    </div>
  );
}
