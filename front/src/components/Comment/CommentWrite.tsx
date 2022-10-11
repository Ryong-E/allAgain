import styled from 'styled-components'
import { useForm, SubmitHandler } from "react-hook-form";

const CommentWriteBox = styled.div`
  display: flex;
  padding: 25px 0;
  height: 80px;
  border-bottom: 1px solid rgba(231, 225, 210, 1);
  &.ReComment{
    margin-left: 50px;
  }
  form{
    width:100%;
    display:flex;
    align-items:center;
    input {
      background: inherit;
      border: none;
      width: 100%;
      height: 100%;
      &:focus {
        outline: none;
      }
    }
  }

`

const SubmitIconBtn = styled.button`
  width:20px;
  height:20px;
  border: 1px solid #000;
  background: inherit;
  margin-left:20px;
`

interface ReCommentType {
  isReCommentWrite ?:Boolean;
}

interface WriteInputType {
  commentWrite ?: string;
}

export default function CampaignCommentWrite({isReCommentWrite}: ReCommentType) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<WriteInputType>();
  const onSubmit: SubmitHandler<WriteInputType> = ({commentWrite}) => {
      console.log("commentWrite",commentWrite);
  }
  return (
    <CommentWriteBox className={isReCommentWrite ? "ReComment" : ""} >
      <div className="userImgBox">
        <img src="" alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="댓글 달기..." {...register("commentWrite")} />
        <SubmitIconBtn type="submit"></SubmitIconBtn>
      </form>
    </CommentWriteBox>
  )
}
