import { useEffect, useState } from 'react';
import slideImg01 from "../../assets/images/main_slide01.jpg";
import slideImg02 from "../../assets/images/main_slide02.jpg";
import slideImg03 from "../../assets/images/main_slide03.jpg";
import slideImg04 from "../../assets/images/main_slide04.jpg";
import slideImg05 from "../../assets/images/main_slide05.jpg";
import slideImg06 from "../../assets/images/main_slide06.gif";
import slideImg07 from "../../assets/images/main_slide07.gif";

import { ROUTE } from '../../constant/route';
import { Link } from 'react-router-dom';
import * as StyledSlider from "./MainContentSlide.style";

export default function MainContentsSlide2() {

  const title = ["우유팩으로 지갑을 만든다?", "a", "b", "a", "b", "a", "b"];
  const slideImgUrl = [slideImg01, slideImg02, slideImg03, slideImg04, slideImg05, slideImg06, slideImg07];
  const userImgUrl = ["", "", "", "", "", "", "", ""];
  const userNameText = ["밀키프로젝트", "119REO", "페트와니트", "여행가고싶다", "크로키달인", "ㅁ", "ㄴ"];

  return (
    <StyledSlider.ContentSlideRoot>
      <StyledSlider.ContentTitleBox>
        <p>업사이클링 제품을 만들어서 도움이 필요한 곳에 기부해 주세요</p>
      </StyledSlider.ContentTitleBox>
      <StyledSlider.SwiperWrap
        slidesPerView={'auto'}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {
          [1,2,3,4,5,6,7].map((ele, idx) => (
            <StyledSlider.Slide key={idx}>
              <StyledSlider.SlideImg className="slideImg"><img src={slideImgUrl[idx]} /></StyledSlider.SlideImg>
              <StyledSlider.SlideContent>
                <div className="contentTitle">{title[idx]}</div>
                <StyledSlider.InfoBox className="infoBox">
                    <StyledSlider.UserImg><img src={userImgUrl[idx]} /></StyledSlider.UserImg>
                    <StyledSlider.UserName>{userNameText[idx]}</StyledSlider.UserName>
                </StyledSlider.InfoBox>
              </StyledSlider.SlideContent>
            </StyledSlider.Slide>
          ))
        }
        <StyledSlider.Slide className='lastSlide'>
          <Link to={ROUTE.FEED_LIST.link} />
        </StyledSlider.Slide>
      </StyledSlider.SwiperWrap>
    </StyledSlider.ContentSlideRoot>
  )
}
