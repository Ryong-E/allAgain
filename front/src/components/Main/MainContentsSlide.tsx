import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'


import "swiper/css";


const ContentSlideRoot = styled.div`

`
const ContentTitleBox = styled.div`

`
const SwiperWrap = styled(Swiper)`

`
const Slide = styled(SwiperSlide)`

`

export default function MainContentsSlide() {
  return (
    <ContentSlideRoot>
      <ContentTitleBox>
        <div className="title">
          이름모를 콘텐츠이름
        </div>
      </ContentTitleBox>
      <SwiperWrap
        slidesPerView={4}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        <Slide>
          <div className="imgBox">
            <img src="" alt="" />
          </div>
          <div className="content">
            <div className="contenTitle">

            </div>
            
          </div>
        </Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
        <Slide>Slide 4</Slide>
        
      </SwiperWrap>
    </ContentSlideRoot>
  )
}
