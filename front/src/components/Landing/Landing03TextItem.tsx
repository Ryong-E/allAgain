import React from 'react'
import styled from 'styled-components';




const LandingImgBox = styled.div<{imgSize: string, transitionDelay: string}>`
  width:${({imgSize})=> imgSize}%;
  opacity: 0;
  transition : opacity 1.5s ${({transitionDelay})=>transitionDelay}s;
  &:nth-child(2),&:nth-child(4){
    margin: 0 0 0 auto;
  }
  &:nth-child(5){
    margin: 0 auto 0 380px;
    
  }
  &:nth-child(7){
    margin: 0 60px 0 auto;
  }
  &:nth-child(8){
    margin: 0 auto 0 300px;
  }
  &:nth-child(9){
    margin: 0 300px 0 auto;
  }
  &:nth-child(10){
    margin: 0 auto 0 80px;
  }
  &:nth-child(1),&:nth-child(2){
    margin-bottom:30px;
  }
  &:nth-child(n+3){
    margin-bottom:60px;
  }
  &.active{
    opacity: 1;
  }
`


interface LandingTextImg{
  imgSrc: string;
  imgSize: string;
  idx: number;
  transitionDelay: string;
};


export default function Landing03TextItem({imgSrc, idx, imgSize, transitionDelay}:LandingTextImg) {
  return (
    <LandingImgBox  className={`LadingTextImg${idx+1} active`} imgSize={imgSize} transitionDelay={transitionDelay} >
      <img src={imgSrc} alt={imgSrc+idx} />
    </LandingImgBox>
  )
}
