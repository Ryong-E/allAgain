import React from 'react'
import styled from 'styled-components';




const LandingImgBox = styled.div<{ transitionDelay: string}>`
  opacity: 0;
  transition : opacity 1.5s ${({transitionDelay})=>transitionDelay}s;
  
  &:nth-child(2),&:nth-child(4),&:nth-child(7),&:nth-child(9){
    text-align:right;
  }
  &:nth-child(5),&:nth-child(8){
    text-align:center;
  }
  &:nth-child(5){
    margin-right:100px;
  }
  &:nth-child(7){
    margin-right:50px;
  }
  &:nth-child(8){
    margin-right:300px;
  }
  &:nth-child(9){
    margin-right:100px;
  }
  &:not(:nth-child(9),:nth-child(10)):nth-child(n+4){
    margin-bottom:40px;
  }
  &:nth-child(4),&:nth-child(5){
    margin-bottom:70px;
  }
  &:nth-child(10){
    margin-left:100px;
  }
  
  &.active{
    opacity: 1;
  }
`


interface LandingTextImg{
  imgSrc: string;
  idx: number;
  transitionDelay: string;
};


export default function LandingTextImgItem({imgSrc, idx,  transitionDelay}:LandingTextImg) {
  return (
    <LandingImgBox  className={`LadingTextImg${idx+1} active`}  transitionDelay={transitionDelay} >
      <img src={imgSrc} alt={imgSrc+idx} />
    </LandingImgBox>
  )
}
