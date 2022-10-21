import styled from 'styled-components';
import plusIcon from "../../assets/images/icons/icon_plus.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import img from "../../assets/images/icons/icon_upcycle_big.png";

export const ContentSlideRoot = styled.div`
  margin-top: 110px;

`;

export const ContentTitleBox = styled.h3`
  position: relative;
  padding: 0 160px;
  font-family: 'SpoqaHanSansNeo-Regular';
  font-size: 24px;
  line-height: 2;
  margin-bottom: 40px;

  p {
    position: relative;
    z-index: 5;
  }

  &:after {
    content: "";
    position: absolute;
    top: -18px;
    left: 150px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: url(${img}) no-repeat 50% 50%/contain;
    opacity: .5;
    z-index: 1;
  }
`;

export const SwiperWrap = styled(Swiper)<any>`
  padding: 20px 80px 20px 140px;
  height: 440px;
`;

export const Slide = styled(SwiperSlide)`
  width: 340px;
  height: 400px;
  border: 1px solid #e7e5e0;
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  border-radius: 20px;
  user-select:none;

  &.lastSlide {
    width: 100px;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      width: 50px;
      height: 50px;
      background: url(${plusIcon}) no-repeat 50% 50%/contain;
    }
  }

  
  &:hover {

    .slideImg img {
      transform: scale(1.07);
    }
  }



`;

export const SlideImg = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    box-shadow: inset 10px 5px 20px 5px rgba(150, 150, 150, 0.15);
    z-index: 5px;
  }

  img {
    width:100%;
    height:100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform .4s;
  }
`;

export const SlideContent = styled.div`
  padding: 0 20px;

  .contentTitle{
    padding: 12px 0;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #e7e5e0;
  }
`;

export const InfoBox = styled.div`
  display:flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
`;


export const UserImg = styled.div`
  width: 26px;
  height: 26px;

  img {
    width:100%;
    height:100%;
    object-fit: cover;
  } 
`;

export const UserName = styled.div`
  margin-left: 10px;
`;
