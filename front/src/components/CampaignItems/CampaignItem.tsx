import styled, { keyframes } from "styled-components"
import { useRef, useEffect } from "react"
import LikeToggle from "../common/LikeToggle"
import { ShareButton } from "../common/Buttons"
import { Link } from "react-router-dom"
import UserImgBox from "../Comment/UserImgBox"
import UserName from "../common/UserName"
import CampaignDDay from "./CampaignDDay"
import { ROUTE } from "../../constant/route"

const ListItemBox = styled.div`
  display:flex;
  width:100%;
  height: 300px;
  background: ${({theme})=> theme.colors.white};
  border: 1px solid #000;
  & + & {
    margin-top: 20px;
  }
  &.bright{
    .thumbnailBox{
      filter: grayscale(100%);
    }
    .statusBox{
      
      .status{
        background:${({theme})=> theme.colors.placeholder};
      }
    }
  }
`
const ThumbnailImgBox = styled.div`
  width: 360px;
  height:100%;
  flex-shrink: 0;
  img{
    
  }
`
const ContentsBox = styled.div`
  padding: 20px 28px 20px 40px;
  border-left: 1px solid #000;
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
    padding: 5px 15px;
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
  font-size: 14px;
  a{
    display: inline-flex;
    align-items:center;
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

export interface DummyPropsType
  { 
    id ?: number;
    campaign_id ?: number;
    thumbnailImg ?: string;
    isLike ?: boolean;
    title ?: string;
    desc ?: string;
    status ?: string;
    recruitment ?: string[];
    progress ?: string[];
    personnel ?: number;
    participating ?: number;
    userImg ?: string;
    userName ?: string;
  }

export default function CampaignItem({id, campaign_id,thumbnailImg,isLike,title,desc,status,recruitment,progress,personnel,participating,userImg,userName} : DummyPropsType) {
  const person  = personnel!;
  let endEvent = participating!;
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
  }, [status])
  
  return (
    <ListItemBox className={status === "모집마감" ? "bright" : ""}>
      <CampaignItemLinkBox>
        <Link to={`${ROUTE.CAMPAGIN_DETAIL.link}${campaign_id}`}>
          <ThumbnailImgBox className="thumbnailBox">
            <img src={thumbnailImg} alt="썸네일이미지" />
          </ThumbnailImgBox>
        </Link>
      </CampaignItemLinkBox>
      <ContentsBox>
        <StatusBox className="statusBox">
          <div className="status">
            {/* 상태 확인 state 넣어주세요 */}
            {status}
          </div>
          <div className="shareAndLikeBox">
            <ShareButton />
            <LikeToggle />
          </div>
        </StatusBox>
        <ItemInfoBox>
          <CampaignItemLinkBox>
            <Link to={`${ROUTE.CAMPAGIN_DETAIL.link}${campaign_id}`}>
              <TextBox>
                <h3 className="title">{title}</h3>
                <div className="desc">{desc}</div>
              </TextBox>
            </Link>
          </CampaignItemLinkBox>
          <PeriodBox>
            <div className="recruitment">
              <strong>모집 기간</strong>
              {/* array 오면 0번 1번 넣어주세요 */}
              <span>{recruitment![0]} ~ {recruitment![1]}</span>
            </div>
            <div className="progress">
              <strong>진행 기간</strong>
              {/* array 오면 0번 1번 넣어주세요 */}
              <span>{progress![0]} ~ {progress![1]}</span>
            </div>
            <div className="personnel">
              <strong>모집 인원</strong>
              <span>{personnel!}명</span>
            </div>
          </PeriodBox>
          <CreatedUser>
            <Link to={`/user/:id`}>
              <UserImgBox/>
              <UserName userName={userName}/>
            </Link>
          </CreatedUser>
        </ItemInfoBox>
        <LimitBox>
          <RateBox>
            <div className="lengthBox">
              <div className="length" ref={length}></div>
            </div>
            <div className="participating">
              <span>{participating!}명</span> 참여 중
            </div>
          </RateBox>
          <div className="endDate">
            <CampaignDDay status={status!} endDate={status === "모집 중" ? recruitment![1] : status === "모집예정" ? recruitment![0] : ""} />
          </div>
        </LimitBox>
      </ContentsBox>
    </ListItemBox>
  )
}
