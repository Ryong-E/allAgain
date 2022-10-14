import React, { useState } from 'react'
import styled, { DefaultTheme, ThemeProps } from 'styled-components';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react'
import banner01 from "../../assets/images/campaign_banner01.png";
import banner02 from "../../assets/images/campaign_banner02.png";
import banner03 from "../../assets/images/campaign_banner03.png";

import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";


import { Autoplay, EffectFade, Navigation} from "swiper";

const SlideWrap = styled(Swiper)`
  


  .swiper-button-next,.swiper-button-prev{
    position:relative;
    width:28px;
    height:28px;
    top:0;
    background: #ffffff50;
    border-radius: 50%;
    margin-top: 0;
    color:#fff;
    &::after{
      font-size:12px;
    }
  }
  
`
const Slide = styled(SwiperSlide)`
  
  img{
    display:block;
    margin: 0 auto;
    max-width:1920px;
  }
`

const NavigationBox = styled.div`
  position:absolute;
  z-index:2;
  right: 15%;
  bottom:5%;
  width:70px;
`

const NavigationBtnBox = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`

const PrevBtn = styled.button`
  &.swiper-button-prev{
    left: 0  ;
    &::after{
      margin-right: 1px;
    }
  }
`
const NextBtn = styled.button`
  &.swiper-button-next{
    right: 0 ;
    &::after{
      margin-left: 1px;
    }
  }
`

const PageBox = styled.div`
  color:${({theme})=> theme.colors.white};
  font-size:14px;
  font-weight:100;
  margin: 10px 5px 0 0;
  text-align: right;
`


export default function CampaignSlide() {
  const [banners, setBanners] = useState([
    {
      sildeItem :banner01,
      color : "#3A4860"
    },
    {
      sildeItem :banner02,
      color : "#BBADCE"
    },
    {
      sildeItem :banner03,
      color : "#668774"
    },
  ])
  const [currentIdx, setCurrentIdx] = useState(0);
  
  return (
    <SlideWrap
      spaceBetween={30}
      effect={"fade"}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }} 
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Autoplay]}
      className="mySwiper"
      onSlideChange={(e)=>{
        const nowIdx = e.activeIndex === banners.length+1 ? 1 : e.activeIndex === 0 ? banners.length : e.activeIndex
        setCurrentIdx(nowIdx)
      }}
    >
      {banners.map(({sildeItem, color},idx) => (
          <Slide key={sildeItem} style={{background:`${color}`}}>
          <img src={sildeItem} alt="" />
        </Slide>
        ))}
      <NavigationBox>
        <NavigationBtnBox>
          <PrevBtn className="swiper-button-prev"></PrevBtn>
          <NextBtn className="swiper-button-next"></NextBtn>
        </NavigationBtnBox>
        <PageBox>
          {currentIdx} / {banners.length}
        </PageBox>
      </NavigationBox>
    </SlideWrap>
  )
}
