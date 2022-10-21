import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import sendHoverIcon from "../../assets/images/icons/icon_send_hover.png";
import sendIcon from "../../assets/images/icons/icon_send.png";
import sendRedIcon from "../../assets/images/icons/icon_red_send.png";
import UserImgBox from "./UserImgBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "../../api/commentsApi";
import { CREATE_COMMENTS, FEED_DETAIL, GET_DETAILCAMPAIGN } from "../../constant/queryKeys";
import { loggedInUserId, loggedInUserImgUrl } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import ConfirmModal from "../Modals/ConfirmModal";
import { useState } from "react";

const CommentWriteBox = styled.div`
  display: flex;
  padding: 15px 0 15px;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid rgba(231, 225, 210, 1);
`;

const CommentFrom = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    background: inherit;
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
`;

const SubmitIconBtn = styled.button`
  width: 20px;
  height: 20px;
  background: url(${sendIcon}) center center no-repeat;
  background-size: cover;
  margin-left: 20px;
  transition: background 0.3s;
  &:hover {
    background-image: url(${sendHoverIcon});
  }
  &.toMuch {
    position: relative;
    background-image: url(${sendRedIcon});
  }
`;

interface WriteInput {
  commentWrite?: string;
}

export interface CommentData {
  pathID: number;
  commentId?: number;
  userImg ?: String;
}

export default function CampaignCommentWrite({
  pathID,
  commentId,
}: CommentData) {
  const queryClient = useQueryClient();
  const isLogin = useRecoilValue(loggedInUserId);
  const userImg = useRecoilValue(loggedInUserImgUrl);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [showModal, setShowModal] = useState(false);
  const categotry = pathname.split("/")[1];
  const createCommentMutate = useMutation(
    [CREATE_COMMENTS],
    createCommentApi,
    {
      onSuccess: (data: any, variables, context) => {
        queryClient.invalidateQueries([categotry === "campaign" ? GET_DETAILCAMPAIGN : FEED_DETAIL]);
      },
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<WriteInput>();
  const onSubmit: SubmitHandler<WriteInput> = ({ commentWrite }) => {
    createCommentMutate.mutate({
      feedId : pathID ,
      campaignId : pathID,
      content: commentWrite!,
      rootCommentId: commentId !== null ? commentId! : null,
      pathname : categotry
    });
    reset();
  };
  const handleClickLoginLink = () => {
    setShowModal(true);
  };
  const commentLength = watch("commentWrite")?.length;
  return (
    <CommentWriteBox>
      <UserImgBox userImg={userImg}/>
      <CommentFrom onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={
            isLogin === null
              ? "로그인 후 이용 가능합니다"
              : "댓글 달기...(최대 80자)"
          }
          tabIndex={0}
          required
          {...register("commentWrite", {
            maxLength: 80,
          })}
          disabled={isLogin === null}
        />
        <SubmitIconBtn
          className={commentLength! > 80 ? "toMuch" : ""}
          onClick={() => {
            isLogin === null && handleClickLoginLink();
          }}
          type="submit"
        />
      </CommentFrom>
      {showModal && <ConfirmModal showModal={showModal} setShowModal={setShowModal} returnPath={pathname} />}
    </CommentWriteBox>
  );
}
