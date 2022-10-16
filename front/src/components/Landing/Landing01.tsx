import { useEffect } from "react"
import styled from "styled-components"
import { ServiceDetailBox } from "./Landing03"
import LandingImgs from "./LandingImgs"
import MountainsParallaxItems from "./MountainsParallaxItems"

const Section = styled.section`
  position: relative;
  height: calc(100vh - 70px);
  text-align:center;
  display:flex;
  background: #d0e2db;
  transform-origin:50% 0 ;
  transition : transform 2s;
  transform: scale(10);
  overflow: hidden;
  &.active{
    transform: scale(1);
    .titleBox, .mainDescTextBox{
      opacity: .5;
    }
  }
  
`
const TitleBox = styled.div`
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  z-index : 10;
  transition : opacity 1.3s 1s;
  img{
    max-width:80%;
  }
`

const MainDescTextBox = styled.div`
  opacity: 0;
  font-weight: 900;
  font-size:80px;
  margin: auto;
  position: relative;
  z-index : 10;
  transition : opacity 1s 2s;
  color:${({theme})=> theme.colors.lightGreen}90;
  p{
    display:flex;
    justify-content:space-between;
    span{
      letter-spacing: 20px;
    }
  }
`

export default function Landing01() {
  const zIndex = [5,4,3,2,1];
  
  
  return (
    <Section id="section01" className="active">
      <TitleBox className="titleBox">
        <img src={LandingImgs.landingTitle} alt="다시, 다 프로젝트" />
      </TitleBox>
      <MainDescTextBox className="mainDescTextBox">
        <p><span>당신은</span> <span>지구를</span> 위해</p>
        어떤 노력을 하고 있나요?
      </MainDescTextBox>
      {LandingImgs.section01Imgs.map((ele,idx) => (
        <MountainsParallaxItems bgImage={ele} idx={idx} zIndex={zIndex[idx]}/>
      ))}
    </Section>
  )
}
