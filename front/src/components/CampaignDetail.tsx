import styled from "styled-components";
import CampaignItem from "./CampaignItem";

const BtnBox = styled.div`
  display:flex;
  justify-content: flex-end;
  button{
    margin-left:20px;
  }
`

const JoinCampaignBox = styled.div`
  margin-top: 10px;
  button{
    width:100%;
    height:70px;
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

    </div>
  )
}
