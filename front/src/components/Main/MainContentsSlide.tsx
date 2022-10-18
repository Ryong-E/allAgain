import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import upcy from "../../assets/images/icons/icon_upcycle_light.png"
import like from "../../assets/images/icons/icon_like_on.png"

import "swiper/css";
import UserImgBox from '../Comment/UserImgBox';
import UserName from '../common/UserName';


const ContentSlideRoot = styled.div`
  & + &{
    margin-top : 50px;
  }
`
const ContentTitleBox = styled.div`
  padding: 0 100px;
  font-size:20px;
  margin-bottom : 40px;
`
const SwiperWrap = styled(Swiper)`
  padding: 0 100px;
  height: 370px;
  @media (max-width: 1920px){
    height: 19.2708vw;
    min-height: 335px;
  }
`
const Slide = styled(SwiperSlide)`
  display:flex;
  flex-direction: column;
  height:100%;
  border: 1px solid #000;
  border-radius: 20px;
  user-select:none;
  .imgBox{
    height:calc(100% - 99px);
    img{
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }
`

const Content = styled.div`
  flex-shrink: 0;
  padding: 0 20px;
  border-top : 1px solid #000;
  color: #000;
  .contentTitle{
    padding: 10px 0;
    border-bottom : 1px solid #000;
    font-size: 18px;
    font-weight: 600;
    
  }
`
const InfoBox = styled.div`
      display:flex;
      align-items:center;
      justify-content: space-between;
      padding: 10px 0;
      .userBox{
        display:flex;
        align-items:center;
        font-weight: 600;
        font-size: 14px;
        .userImgBox{
          margin: 0 10px 0 0;
        }
      }
      .smallThings{
        display:flex;
        align-items:center;
        .smallThingsImgBox{
          width:16px;
          height:16px;
        }
        span{
          margin-left: 10px;
        }
      }
`

export default function MainContentsSlide() {
  const [resizePreView, serResizePreView] = useState(5);
  const handleWindowResize = ()=>{
    const width = window.innerWidth;
    serResizePreView(width / 400);
  }
  useEffect(()=>{
    handleWindowResize();
  },[])
  useEffect(()=>{
    window.addEventListener("resize",handleWindowResize);
  })
  return (
    <ContentSlideRoot>
      <ContentTitleBox>
        <h2 className="title">
          좋아요 많은 피드
        </h2>
      </ContentTitleBox>
      <SwiperWrap
        slidesPerView={resizePreView}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {[1,2,3,4,5,6,7,8,9,10].map(ele =>(

        <Slide>
          <div className="imgBox">
            <img src={upcy} alt="" />
          </div>
          <Content className="content">
            <div className="contentTitle">
              타이틀{ele}
            </div>
            <InfoBox className="infoBox">
              <div className="userBox">
                <UserImgBox/>
                <UserName userName={"어드민"}/>
              </div>
              <div className="smallThings">
                <div className="smallThingsImgBox">
                  <img src={like} alt="좋아요이미지" />
                </div>
                <span>30</span>
              </div>
            </InfoBox>
          </Content>
        </Slide>
        ))}
      </SwiperWrap>
    </ContentSlideRoot>
  )
}
