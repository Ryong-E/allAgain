import styled, { css } from "styled-components";
import LikeIconOn from "../../assets/images/icons/icon_like_on.png";
import LikeIconOff from "../../assets/images/icons/icon_like_off.png";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { createLike, deleteLike } from "../../api/feedApi";
import { useEffect, useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal";

const LikeButton = styled.button<{ isActive: boolean }>`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${LikeIconOff}) no-repeat 50% 50% / contain;
  transition: all 0.3s;
  &:hover {
    transform: scale(0.9);
  }
  ${({ isActive }) =>
    isActive &&
    css`
      background-image: url(${LikeIconOn});
    `}
`;

interface LikePropsType {
  isLiked: boolean;
  feedId: number;
  likeId?: number;
  userId: number | null;
  count: number;
}

export default function FeedLikeToggle({
  isLiked,
  feedId,
  likeId,
  userId,
  count,
}: LikePropsType) {
  const [liked, setLiked] = useState<boolean>(false);
  const [keepLikeId, setKeepLikeId] = useState<number>();
  const [keepCount, setKeepCount] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const isToken = sessionStorage.getItem("jwtToken");

  const { pathname } = useLocation();

  const createLikeKey = useMutation(() => createLike(feedId, userId!));
  const deleteLikeKey = useMutation(() => {
    return deleteLike(
      createLikeKey.data ? createLikeKey.data!.likeId : keepLikeId!
    );
  });

  const handleClickLike = () => {
    if (isToken) {
      if (createLikeKey.isLoading || deleteLikeKey.isLoading) return;
      if (liked) {
        deleteLikeKey.mutate();
        setLiked(false);
        setKeepCount(keepCount - 1);
      } else if (!liked) {
        createLikeKey.mutate();
        setLiked(true);
        setKeepCount(keepCount + 1);
      }
    } else alert("로그인한 유저만 이용할 수 있는 기능입니다");
  };

  useEffect(() => {
    setLiked(isLiked);
  }, [setLiked, isLiked]);

  useEffect(() => {
    setKeepLikeId(likeId);
  }, [setKeepLikeId, likeId]);

  useEffect(() => {
    setKeepCount(count);
  }, [setKeepCount, count]);

  return (
    <ButtonContainer>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        returnPath={pathname}
      />
      <LikeButton
        isActive={liked}
        onClick={() => {
          userId !== null ? handleClickLike() : setShowModal(true);
        }}></LikeButton>
      <Count>{keepCount}</Count>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.div`
  margin-left: 8px;
  color: #000000;
  height: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;
