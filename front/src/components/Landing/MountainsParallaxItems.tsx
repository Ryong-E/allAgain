import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ParallaxItem = styled.div<{bgImage: string, zIndex: number}>`
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: 0 30%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(${({bgImage})=> bgImage});
  z-index : ${({zIndex})=> zIndex};
  &.parallaxItem2{
    width:101%;
    left: -10px;
  }
  &.active{
    opacity: 1;
    background-position: 0 46%;
  }
  &.active.parallaxItem1{
    opacity: 1;
    background-position: 0 55%;
  }
  &.active.parallaxItem2{
    opacity: 1;
    background-position: 0 51%;
  }
  &.active.parallaxItem5{
    opacity: 1;
    background-position: 0 30%;
  }
  transition: background-position 1s ${({zIndex}) => 0.3*(zIndex-1)}s, opacity 1.8s ${({zIndex}) => 0.3*(zIndex-1)}s;
  @media (max-width:1920px){
    &.parallaxItem2{
      width:101%;
      left: -0.5208vw;
    }
  }
`
/* 
반응형 하려면 )
max-width : 1200 부터 position 값 새로 줘야할듯
max-width : 760 바닥 보임
 */


interface ParallaxType {
  bgImage : string;
  isLoading : Boolean;
  zIndex : number;
  idx : number;
}

export default function MountainsParallaxItems({bgImage, zIndex, idx, isLoading} : ParallaxType) {
  const currentRef = useRef<HTMLDivElement>(null);
  const handleWindowScrollMountainMove = () =>{
    const documentTop = window.scrollY;
    const currentItem = currentRef.current;
    if(currentItem && !currentItem.classList.contains("parallaxItem1")){
      currentItem.style.bottom = -(documentTop * ((idx+1)*0.15)) + "px";
    }
  };
  useEffect(()=>{
    window.addEventListener("scroll",handleWindowScrollMountainMove)
    return ()=>{
      window.removeEventListener("scroll",handleWindowScrollMountainMove)
    }
  })
  
  
  return (
    <ParallaxItem className={`parallaxItem${idx+1} parallaxItem ${isLoading ? "active" : ""}`} ref={currentRef} bgImage={bgImage} zIndex={zIndex}/>
  )
}
