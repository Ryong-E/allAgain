import styled from "styled-components";
import CampaignItem from "./CampaignItem";

const BtnBox = styled.div`
  display:flex;
  justify-content: flex-end;
  button{
    margin-left:10px;
  }
`

const JoinCampaignBox = styled.div`
  margin-top: 10px;
  button{
    width:100%;
    height:70px;
  }

`

const CommentContainer = styled.div`
  padding : 30px 70px;
  border : 1px solid #000;
  margin: 0 auto;
  .writeCommentBox{
    display:flex;
    padding:  25px 0;
    height:80px;
    border-bottom : 1px solid #000;
    
    input{
      border :none;
      width:100%;
      height:100%;
      &:focus{
        outline:none;
      }
    }
  }
  .userImgBox{
    margin: 0 30px;
    height:30px;
    width:30px;
    flex-shrink:0;
    border : 1px solid #000;
    img{

    }
  }
`

const CommentListBox = styled.div`
display:flex;
padding:  25px 0;
.userImgBox{
  margin-top: 6px;
}
.commentBox{

    .userName{
      margin-bottom:10px;
    }
    .commnet{

    }
}
`

export default function CampaignDetail() {
  return (
    <div>
      <BtnBox>
        <button>삭제</button>
        <button>수정</button>
      </BtnBox>
      <CampaignItem/>
      <JoinCampaignBox>
        <button>
          캠페인 참여하기
        </button>
      </JoinCampaignBox>
      {/*  */}
      <CommentContainer>
        <div className="writeCommentBox">
          <div className="userImgBox">
            <img src="" alt="" />
          </div>
          <input type="text" placeholder="댓글 달기..." />
        </div>
        <CommentListBox>
            <div className="userImgBox">
              <img src="" alt="" />
            </div>
            <div className="commentBox">
              <div className="userName">
                금잔디 명예소방관
              </div>
              <div className="commnet">
                {/* {xx.length >= 100 ? 
                  <>
                  xx.slice(0,50)+"..." 
                  <button onClick={()=>{isTrue(!true)}}>
                    {isTrue ? 간략히 보기 : 자세히 보기 }
                  </button>
                  </>:
                   xx} */}
              </div>
            </div>
        </CommentListBox>
      </CommentContainer>
    </div>
  )
}
