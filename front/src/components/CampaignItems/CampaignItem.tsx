import styled, { keyframes } from "styled-components"
import { useRef, useEffect } from "react"
import LikeToggle from "../common/LikeToggle"
import { ShareButton } from "../common/Buttons"
import { Link } from "react-router-dom"
import UserImgBox from "../Comment/UserImgBox"
import UserName from "../common/UserName"

const ListItemBox = styled.div`
  display:flex;
  width:100%;
  height: 300px;

`
const ThumbnailImgBox = styled.div`
  width: 360px;
  height:100%;
  flex-shrink: 0;
  border: 1px solid #000;
  img{
    
  }
`
const ContentsBox = styled.div`
  padding: 20px 28px 20px 40px;
  border: 1px solid #000;
  width: calc(100% - 320px);
  display:flex;
  flex-direction: column;
  justify-content: space-between;
`
const StatusBox = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  .status{
    font-size:13px;
    border: 1px solid #000;
    padding: 3px 15px;
    background: rgba(0, 77, 73, 1);
    color: #fff;
    letter-spacing: -0.4px;
  }
  .shareAndLikeBox{
    display:flex;
    align-items: center;
    button + div{
      margin-left: 20px;
    }
  }
`
const ItemInfoBox = styled.div`
  max-width:650px;
  width:85%;
`
const TextBox = styled.div`
  margin-bottom:20px;
  .title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom:5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .desc{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(169, 169, 169, 1);
    font-size: 14px;
  }
`
const PeriodBox = styled.div`
  font-size: 15px;
  margin-bottom:20px;
  .recruitment{
    display:inline-block;
    margin-right: 30px;
  }
  .progress{
    display:inline-block;
  }
  .personnel{
    margin-top:5px;
  }
  strong{
    font-weight: bold;
    margin-right: 10px;
  }
  span{

  }
`
const CreatedUser = styled.div`
  display: flex;
  align-items:center;
  font-size: 14px;

  .userImgBox{
    margin : 0;
  }
  .userNameBox{

    .userName{
      margin:0 3px 0 10px;
    }
    .isFamousUser{
  
    }
  }
`
const LimitBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: rgba(144, 148, 156, 1);
  .endDate{
    font-weight: bold;
  }
`

const rateAnimation = keyframes`
  100%{
    width:var(--lengthRate);
  }
`

const RateBox = styled.div`
  display: flex;
  align-items: center;
  .lengthBox{
    width: 480px;
    height: 2px;
    background: rgba(238, 238, 238, 1);
    .length{
      width:0;
      height:2px;
      background: rgba(0, 77, 73, 1);
      animation: ${rateAnimation} 1.3s forwards;
    }
  }
  .participating{
    margin-left: 30px;
    span{
      font-weight: bold;
    }
  }
`

const CampaignItemLinkBox = styled.div`
  a{
    display:block;
    width:100%;
    height:100%;
  }
`

export default function CampaignItem() {
  const person  = 80;
  let endEvent = 48;
  let lengthRate = (endEvent/ person)*100; 
  const length = useRef<HTMLDivElement>(null);
  const rateAnimation = ()=>{
    const len = length.current;
    if(len !== null){
      len.style.setProperty("--lengthRate", lengthRate + "%");
    }
  }
  useEffect(() => {
    rateAnimation()
  }, [])
  
  return (
    <ListItemBox>
      <CampaignItemLinkBox>
        <Link to={`/campaigns/:id`}>
          <ThumbnailImgBox>
            <img src="" alt="썸네일이미지" />
          </ThumbnailImgBox>
        </Link>
      </CampaignItemLinkBox>
      <ContentsBox>
        <StatusBox>
          <div className="status">
            {/* 상태 확인 state 넣어주세요 */}
            모집 중
          </div>
          <div className="shareAndLikeBox">
            <ShareButton />
            <LikeToggle />
          </div>
        </StatusBox>
        <ItemInfoBox>
          <CampaignItemLinkBox>
            <Link to={`/campaigns/:id`}>
              <TextBox>
                <h3 className="title">폐자전거 업사이클링을 통한 자전거 기부</h3>
                <div className="desc">버려진 폐자전거의 부품을 업사이클링하여 디자인 소품을 만듭니다. 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용</div>
              </TextBox>
            </Link>
          </CampaignItemLinkBox>
          <PeriodBox>
            <div className="recruitment">
              <strong>모집 기간</strong>
              {/* array 오면 0번 1번 넣어주세요 */}
              <span>2022.09.28 ~ 2022.10.28</span>
            </div>
            <div className="progress">
              <strong>진행 기간</strong>
              {/* array 오면 0번 1번 넣어주세요 */}
              <span>2022.11.01 ~ 2022.11.30</span>
            </div>
            <div className="personnel">
              <strong>모집 인원</strong>
              <span>{80}명</span>
            </div>
          </PeriodBox>
          <CreatedUser>
            <UserImgBox/>
            <UserName/>
          </CreatedUser>
        </ItemInfoBox>
        <LimitBox>
          <RateBox>
            <div className="lengthBox">
              <div className="length" ref={length}></div>
            </div>
            <div className="participating">
              <span>{48}명</span> 참여 중
            </div>
          </RateBox>
          <div className="endDate">
            {21}일 남음
          </div>
        </LimitBox>
      </ContentsBox>
    </ListItemBox>
  )
}
