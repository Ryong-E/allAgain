import { useEffect, useState } from 'react';
import slideImg01 from "../../assets/images/main_slide08.jpg";
import slideImg02 from "../../assets/images/main_slide09.jpg";
import slideImg03 from "../../assets/images/main_slide10.jpg";
import slideImg04 from "../../assets/images/main_slide11.jpg";
import slideImg05 from "../../assets/images/main_slide12.jpg";
import slideImg06 from "../../assets/images/main_slide13.jpg";
import slideImg07 from "../../assets/images/main_slide14.jpg";
import userImg01 from "../../assets/images/user_img08.jpg";
import userImg02 from "../../assets/images/user_img09.jpg";
import userImg03 from "../../assets/images/user_img01.jpg";
import userImg04 from "../../assets/images/user_img10.jpg";
import userImg05 from "../../assets/images/user_img11.jpg";
import userImg06 from "../../assets/images/user_img12.jpg";
import userImg07 from "../../assets/images/user_img13.jpg";

import { ROUTE } from '../../constant/route';
import { Link } from 'react-router-dom';
import * as StyledSlider from "./MainContentSlide.style";

export default function MainContentsSlide2() {

  const title = ["요플레 용기로 화분을 만들어서 기부해요", "인화하고 난 후 서랍에 넣어 놓은 필름으로", "우유팩으로 필통을 만들어서 어린이들에게 기부해요", "독거노인을 위한 반려식물 화분 업사이클링", "청바지로 만든 복조리백으로 무엇을 할 수 있을까요", "유기견보호소에 보낼 하네스를 만들어보는 캠페인", "새학기 새 학용품이 필요한 아이들에게 희망을 주세요"];
  const slideImgUrl = [slideImg01, slideImg02, slideImg03, slideImg04, slideImg05, slideImg06, slideImg07];
  const userImgUrl = [userImg01, userImg02, userImg03, userImg04, userImg05, userImg06, userImg07];
  const userNameText = ["빙그레우스", "코닥입니다", "밀키프로젝트", "카페인이필요해", "아이유이유", "강휴지", "잔망잔망"];

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
          <Link to={ROUTE.CAMPAGIN_LIST.link} />
        </StyledSlider.Slide>
      </StyledSlider.SwiperWrap>
    </StyledSlider.ContentSlideRoot>
  )
}
