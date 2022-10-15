import React from 'react'
import styled from 'styled-components';

const LandingImgBox = styled.div`
  img{
    max-width: 100%;
  }

`


interface LandingTextImg{
  imgSrc: string;
  idx: number;
};


export default function Landing03TextItem({imgSrc, idx}:LandingTextImg) {
  return (
    <LandingImgBox className={`LadingTextImg${idx}`}>
      <img src={imgSrc} alt={imgSrc+idx} />
    </LandingImgBox>
  )
}
