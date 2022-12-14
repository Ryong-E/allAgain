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
import ConfirmModal from "../Modals/ConfirmModal";

const LikeButton = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${LikeIconOff}) no-repeat 50% 50% / contain;
  transition: all 0.3s;
  &:not(.guestLike):hover {
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
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
  };
  useEffect(()=>{
    setIsActive(liked!)
  },[])
  return (
    <div>
      <LikeButton
        className={`${isActive ? "active" : ""} ${isLogin === null ? "guestLike" : ""}`}
        onClick={() => {
          isLogin !== null
            ? handleClickLike(campaignId!)
            : handleClickLoginLink();
        }}></LikeButton>
      {showModal && <ConfirmModal showModal={showModal} setShowModal={setShowModal} returnPath={pathname} />}
    </div>
  );
}
