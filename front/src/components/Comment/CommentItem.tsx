import styled from 'styled-components';
import { useState } from 'react';
import CampaignCommentWrite from './CommentWrite';
import CampaignUtilsBox from './CommentUtilsBox';

const CommentBox = styled.div`
  display: flex;
  padding: 25px 0;
  > .userImgBox {
    margin-top: 10px !important;
  }
  .commentTextBox {
    .userName {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 15px;
    }
    .comment {
      font-size: 14px;
    }
  }
`;

export default function CommentItem() {
  const [isReComment, setIsReComment] = useState(false);

  return (
    <>
      <CommentBox>
        <div className="userImgBox">
          <img src="" alt="" />
        </div>
        <div className="commentTextBox">
          <div className="userName">금잔디 명예소방관</div>
          <div className="comment">
            {/* {xx.length >= 100 ? 
                <>
                xx.slice(0,50)+"..." 
                <button onClick={()=>{isTrue(!true)}}>
                  {isTrue ? 간략히 보기 : 자세히 보기 }
                </button>
                </>:
                xx} */}
            시켜줘 너의 명예소방관
          </div>
          <CampaignUtilsBox setIsReComment={setIsReComment} />
        </div>
      </CommentBox>
      {isReComment && <CampaignCommentWrite isReCommentWrite={true} />}
    </>
  );
}
