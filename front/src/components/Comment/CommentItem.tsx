import styled from 'styled-components';
import { useState } from 'react';
import CampaignCommentWrite from './CommentWrite';
import CampaignUtilsBox from './CommentUtilsBox';
import UserImgBox from './UserImgBox';
import UserName from '../common/UserName';
import { Link } from 'react-router-dom';

const CommentBox = styled.div`
  display: flex;
  padding: 25px 0 0;

  .userImgBox {
    margin: 10px 15px 0 30px !important;
  }
  
  .commentTextBox {
    > a{
      display:inline-block;
      margin-bottom: 5px;
      .userNameBox{

        .userName {
          font-weight: bold;
          font-size: 15px;
        }
      }
      .isFamousUser{

      }
    }
    
    
    .comment {
      font-size: 14px;

      p{

      }
      button{
        font-size: 13px;
        color: ${({theme})=> theme.colors.darkBeige};
      }
    }
  }
`;

export default function CommentItem() {
  const [isReComment, setIsReComment] = useState(false);
  const [ts, setTs] = useState(`시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관시켜줘 너의 명예소방관`);
  const [isLong, setIsLong] = useState(false); 
  return (
    <>
      <CommentBox>
        <UserImgBox />
        <div className="commentTextBox">
          <Link to={`/user/:id`}>
            <UserName/>
          </Link>
          <div className="comment">
            {ts.length >= 100 ? 
                <>
                <p>{isLong ? ts : ts.slice(0,50)+"..." }<br/></p>
                <button onClick={()=>{setIsLong(!isLong)}}>
                  {isLong ? <>간략히 보기</> : <>자세히 보기</> }
                </button>
                </>:
                ts}
          </div>
          <CampaignUtilsBox setIsReComment={setIsReComment} />
        </div>
      </CommentBox>
      {isReComment && <CampaignCommentWrite isReCommentWrite={true} />}
    </>
  );
}
