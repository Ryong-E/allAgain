import { useEffect, useState } from 'react';
import slideImg01 from "../../assets/images/main_slide01.jpg";
import slideImg02 from "../../assets/images/main_slide02.jpg";
import slideImg03 from "../../assets/images/main_slide03.jpg";
import slideImg04 from "../../assets/images/main_slide04.jpg";
import slideImg05 from "../../assets/images/main_slide05.jpg";
import slideImg06 from "../../assets/images/main_slide06.gif";
import slideImg07 from "../../assets/images/main_slide07.gif";
import userImg01 from "../../assets/images/user_img01.jpg";
import userImg02 from "../../assets/images/user_img02.jpg";
import userImg03 from "../../assets/images/user_img03.jpg";
import userImg04 from "../../assets/images/user_img04.jpg";
import userImg05 from "../../assets/images/user_img05.jpg";
import userImg06 from "../../assets/images/user_img06.jpg";
import userImg07 from "../../assets/images/user_img07.jpg";

import { ROUTE } from '../../constant/route';
import { Link } from 'react-router-dom';
import * as StyledSlider from "./MainContentSlide.style";

export default function MainContentsSlide2() {
  // const [resizePreView, setResizePreView] = useState(5);

  // const handleWindowResize = ()=>{
  //   const width = window.innerWidth;
  //   if(width >= 1000){
  //     setResizePreView(width / 400);
  //   }else if(800 <= width && width < 1000){
  //     setResizePreView(width / 440);
  //   }else{
  //     setResizePreView(width / 500);
  //   }
  // }
  // useEffect(()=>{
  //   handleWindowResize();
  // },[])
  // useEffect(()=>{
  //   window.addEventListener("resize",handleWindowResize);
  // })


  const title = ["우유팩으로 지갑을 만든다?", "폐방화복 업사이클링 가방으로 소방관 돕는다", "퇴사하고 유니폼으로 노트북 파우치 만들기", "페트병을 니트로!", "핸드폰 카드케이스 만들었어요", "크래프트지를 뭘로 만들었을까요?", "이건 무엇일까요?"];
  const slideImgUrl = [slideImg01, slideImg02, slideImg03, slideImg04, slideImg05, slideImg06, slideImg07];
  const userImgUrl = [userImg01, userImg02, userImg03, userImg04, userImg05, userImg06, userImg07];
  const userNameText = ["밀키프로젝트", "119REO", "여행가고싶다", "페트와니트", "우유좋아", "크로키달인", "업사이클마스터"];

  return (
    <StyledSlider.ContentSlideRoot>
      <StyledSlider.ContentTitleBox>
        <p>당신의 업사이클링 경험을 공유해 주세요</p>
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
