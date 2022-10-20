import styled, { keyframes } from "styled-components";
import { useRef, useEffect, useState } from "react";
import LikeToggle from "../common/LikeToggle";
import { ShareButton } from "../common/Buttons";
import { Link, useLocation } from "react-router-dom";
import UserImgBox from "../Comment/UserImgBox";
import UserName from "../common/UserName";
import CampaignDDay from "./CampaignDDay";
import { ROUTE } from "../../constant/route";
import { fixDate } from "../../utils/dateFix";
import { CampaignItemType } from "../../types/campaignTypes";

const ListItemBox = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(231, 225, 210, 0.8);
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  & + & {
    margin-top: 20px;
  }
  &.lightGreen {
    .statusBox {
      .status {
        background: ${({ theme }) => theme.colors.lightGreen};
      }
    }
  }
  &.bright {
    .thumbnailBox {
      filter: grayscale(100%);
    }
    .statusBox {
      .status {
        background: ${({ theme }) => theme.colors.placeholder};
      }
    }
  }
`;
const ThumbnailImgBox = styled.div`
  width: 360px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ContentsBox = styled.div`
  padding: 20px 28px 20px 40px;
  border-left: 1px solid rgba(231, 225, 210, 0.8);
  width: calc(100% - 320px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StatusBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .status {
    font-size: 13px;
    padding: 5px 15px;
    background: ${({ theme }) => theme.colors.dasidaGreen};
    color: ${({ theme }) => theme.colors.white};
    letter-spacing: -0.4px;
  }
  .shareAndLikeBox {
    display: flex;
    align-items: center;
    button + div {
      margin-left: 20px;
    }
  }
`;
const ItemInfoBox = styled.div`
  max-width: 650px;
  width: 85%;
`;
const TextBox = styled.div`
  margin-bottom: 20px;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .desc {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(169, 169, 169, 1);
    font-size: 14px;
  }
`;
const PeriodBox = styled.div`
  font-size: 15px;
  margin-bottom: 20px;
  .recruitment {
    display: inline-block;
    margin-right: 30px;
  }
  .progress {
    display: inline-block;
  }
  .personnel {
    margin-top: 5px;
  }
  strong {
    font-weight: bold;
    margin-right: 10px;
  }
  span {
  }
`;
const CreatedUser = styled.div`
  font-size: 14px;
  a {
    display: inline-flex;
    align-items: center;
    .userImgBox {
      margin: 0;
    }
    .userNameBox {
      .userName {
        margin: 0 3px 0 10px;
      }
      .isFamousUser {
      }
    }
  }
`;
const LimitBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: rgba(144, 148, 156, 1);
  .endDate {
    font-weight: bold;
  }
`;

const keyfram = keyframes`
  100%{
    width:var(--lengthRate);
  }
`;

const RateBox = styled.div`
  display: flex;
  align-items: center;
  .lengthBox {
    width: 480px;
    height: 2px;
    background: rgba(238, 238, 238, 1);
    .length {
      width: 0;
      height: 2px;
      background: rgba(0, 77, 73, 1);
      transition: width 1.3s;
      &.participantsCount {
        width: var(--lengthRate);
      }
      &.rateMotion {
        animation: ${keyfram} 1.3s forwards;
      }
    }
  }
  .participating {
    margin-left: 30px;
    span {
      font-weight: bold;
    }
  }
`;

const CampaignItemLinkBox = styled.div`
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default function CampaignItem({
  campaignId,
  title,
  content,
  thumbnail,
  recruitmentStartDate,
  recruitmentEndDate,
  campaignStartDate,
  campaignEndDate,
  recruitmentNumber,
  participantsCount,
  introduce,
  status,
  writer,
  participated,
  liked,
}: CampaignItemType) {
  const recruitment = recruitmentNumber!;
  let participants = participantsCount - 1;
  let lengthRate = (participants / recruitment) * 100;
  const length = useRef<HTMLDivElement>(null);
  const {pathname} = useLocation();
  const rateAnimation = () => {
    const len = length.current;
    if (len !== null) {
      len.style.setProperty("--lengthRate", lengthRate + "%");
    }
  };
  const recruitmentStart = fixDate(String(recruitmentStartDate));
  const recruitmentEnd = fixDate(String(recruitmentEndDate));
  const campaignStart = fixDate(String(campaignStartDate));
  const campaignEnd = fixDate(String(campaignEndDate));
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    rateAnimation();
  }, [participants]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoding(true);
    }, 10);
  }, []);
  const handlePreventDefault = (e : React.MouseEvent<HTMLElement> )=>{
    const currentPath = `${ROUTE.CAMPAGIN_DETAIL.link}${campaignId}`;
    if(currentPath === pathname){
      e.preventDefault();
      return
    }
  }
  return (
    <ListItemBox
      className={
        status === "모집 마감"
          ? "bright"
          : status === "모집 예정"
          ? "lightGreen"
          : ""
      }>
      <CampaignItemLinkBox>
        <Link to={`${ROUTE.CAMPAGIN_DETAIL.link}${campaignId}`} onClick={handlePreventDefault}>
          <ThumbnailImgBox className="thumbnailBox">
            <img src={`http://${thumbnail!}`} alt="썸네일이미지" />
          </ThumbnailImgBox>
        </Link>
      </CampaignItemLinkBox>
      <ContentsBox>
        <StatusBox className="statusBox">
          <div className="status">{status}</div>
          <div className="shareAndLikeBox">
            <ShareButton />
            <LikeToggle liked={liked} campaignId={campaignId} />
          </div>
        </StatusBox>
        <ItemInfoBox>
          <CampaignItemLinkBox>
            <Link to={`${ROUTE.CAMPAGIN_DETAIL.link}${campaignId}`} onClick={handlePreventDefault}>
              <TextBox>
                <h3 className="title">{title}</h3>
                <div className="desc">{introduce}</div>
              </TextBox>
            </Link>
          </CampaignItemLinkBox>
          <PeriodBox>
            <div className="recruitment">
              <strong>모집 기간</strong>
              <span>{`${recruitmentStart} ~ ${recruitmentEnd}`}</span>
            </div>
            <div className="progress">
              <strong>진행 기간</strong>
              <span>{`${campaignStart} ~ ${campaignEnd}`}</span>
            </div>
            <div className="personnel">
              <strong>모집 인원</strong>
              <span>{recruitmentNumber}명</span>
            </div>
          </PeriodBox>
          <CreatedUser>
            <Link to={`/user/${writer!.userId}`}>
              <UserImgBox userImg={writer!.imageUrl!} />
              <UserName userName={writer!.nickname!} />
            </Link>
          </CreatedUser>
        </ItemInfoBox>
        <LimitBox>
          <RateBox>
            <div className="lengthBox">
              <div
                className={`length ${isLoding ? "participantsCount" : ""}`}
                ref={length}></div>
            </div>
            <div className="participating">
              <span>{participants}명</span> 참여 중
            </div>
          </RateBox>
          <div className="endDate">
            <CampaignDDay
              status={status!}
              endDate={
                status === "모집 중"
                  ? recruitmentEnd
                  : status === "모집 예정"
                  ? recruitmentStart
                  : ""
              }
              recruitmentNumber={recruitmentNumber!}
              endEvent={participants}
            />
          </div>
        </LimitBox>
      </ContentsBox>
    </ListItemBox>
  );
}
