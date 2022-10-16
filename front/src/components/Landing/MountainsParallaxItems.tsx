import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ParallaxItem = styled.div<{bgImage: string, zIndex: number}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: 0 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(${({bgImage})=> bgImage});
  z-index : ${({zIndex})=> zIndex};

  &.parallaxItem5{
    background-position: 0 35%;
  }
  &.parallaxItem2{
    width:101%;
    left: -10px;
  }
  &.parallaxItem1{
    background-position: 0 55%;
  }
  
  transition: background-position 1.3s 1.${({zIndex}) => zIndex}s;

`

interface ParallaxType {
  bgImage : string;
  zIndex : number;
  idx : number;
}

export default function MountainsParallaxItems({bgImage, zIndex, idx} : ParallaxType) {
  const currentRef = useRef<HTMLDivElement>(null);
  const handleWindowScrollMountainMove = () =>{
    const documentTop = window.scrollY;
    const currentItem = currentRef.current;
    if(currentItem){
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
    <ParallaxItem className={`parallaxItem${idx+1} parallaxItem`} ref={currentRef} bgImage={bgImage} zIndex={zIndex}/>
  )
}
