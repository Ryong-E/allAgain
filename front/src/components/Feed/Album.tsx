import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { ImageUrlType } from "../../types/feedTypes";
import { NextNavigationButton, PrevNavigationButton } from "../common/Buttons";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper";

interface albumProps {
  size: "simple" | "detail";
  imageUrls: ImageUrlType[];
  feedId: number;
}

function Album({ size, imageUrls, feedId }: albumProps) {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleAlbumClick = () => {
    if (size === "simple") navigator(`/feed/${feedId}`, { state: pathname });
  };

  return (
    <>
      <SwiperWrap
        slidesPerView={size === "simple" ? 1 : 1.85}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        onClick={handleAlbumClick}
        className="FeedSwiper"
        size={size}>
        {imageUrls!.map((imageUrl: ImageUrlType) => (
          <Slide size={size}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={"http://" + imageUrl.url}
              alt={imageUrl.name}
              key={
                `${imageUrl.id}` +
                Date.now().toLocaleString() +
                `${imageUrl.name}`
              }
            />
          </Slide>
        ))}
      </SwiperWrap>
    </>
  );
}

const SwiperWrap = styled(Swiper)<{ size: "simple" | "detail" }>`
  user-select: none;
  overflow: visible;

  ${(props) =>
    props.size === "simple"
      ? css`
          width: 400px;
          height: 400px;
        `
      : css`
          width: 1200px;
          height: 650px;
          box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
          background-color: #ffffff;
        `}
  .swiper-button-prev, .swiper-button-next {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background-color: rgba(52, 52, 52, .2);
    &::after {
      font-size: 14px;
      color: rgba(255, 255, 255, .6);
    }
  }
  .swiper-button-prev {
    &::after {
      margin-left: -2px;
    }
  }
  .swiper-button-next {
    &::after {
      margin-right: -2px;
    }
  }
  .swiper-pagination {
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: -33px;
    span.swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      margin: 0 2px;
      background: #E0D4B7;
      opacity: .5;
    }
    span.swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
`;
const Slide = styled(SwiperSlide)<{ size: "simple" | "detail" }>`
  overflow: hidden;
  
  ${(props) =>
    props.size === "simple"
      ? css`
          width: 100%;
          height: 100%;
          cursor: pointer;

          img {
            transition: .4s ease;
          }
        
          &:hover {
            img {
              transform: scale(1.06);
              filter: contrast(0.7);
            }
          }
        `
      : css`
          width: 650px !important;
          height: 650px;
          cursor: drag;
        `}
`;

export default Album;
