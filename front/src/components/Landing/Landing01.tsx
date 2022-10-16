import { useEffect, useState } from "react"
import styled from "styled-components"
import { ServiceDetailBox } from "./Landing03"
import LandingImgs from "./LandingImgs"
import MountainsParallaxItems from "./MountainsParallaxItems"

const Section = styled.section`
  position: relative;
  height: calc(100vh - 70px);
  text-align:center;
  background: #d0e2db;
  overflow: hidden;
  &.active{
    > div{
      transform: scale(1);
      .titleBox, .mainDescTextBox{
        opacity: .5;
      }
    }
  }
`

const InnerBox = styled.div`
  position: relative;
  height:100%;
  transform-origin:50% 0 ;
  transition : transform 2s;
  transform: scale(11);
`

const TitleBox = styled.div`
  opacity: 0;
  position: relative;
  z-index : 10;
  padding-top: 100px;
  transition : opacity 1.3s 1s;
  img{
    max-width:22%;
  }
  @media (max-width: 1920px){
    padding-top: 5.2083vw;
  }
  @media (max-width: 920px){
    padding-top: 48px;
    img{
      max-width: 200px;
    }
  }
`

const MainDescTextBox = styled.div`
  opacity: 0;
  font-weight: 900;
  font-size:80px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index : 10;
  transition : opacity 1s 2s;
  color:${({theme})=> theme.colors.lightGreen}90;
  p{
    word-spacing:20px;
  }
  @media (max-width: 1920px){
    font-size: 4.1666vw;
    p{
      word-spacing: 1.0416vw;
    }
  }
`

export default function Landing01() {
  const zIndex = [5,4,3,2,1];
  const [isLoading, setIsLoading] = useState(false);
  const handleWindowScrollTitleMove=()=>{

  }
  useEffect(()=>{
    setIsLoading(true);
  },[])
  
  return (
    <Section id="section01" className={isLoading ? 'active' : ""}>
      <InnerBox>
        <TitleBox className="titleBox">
          <img src={LandingImgs.landingTitle} alt="다시, 다 프로젝트" />
        </TitleBox>
        <MainDescTextBox className="mainDescTextBox">
          <p>당 신 은 지 구 를 위해</p>
          어떤 노력을 하고 있나요?
        </MainDescTextBox>
        {LandingImgs.section01Imgs.map((ele,idx) => (
          <MountainsParallaxItems isLoading={isLoading} bgImage={ele} idx={idx} zIndex={zIndex[idx]}/>
        ))}
      </InnerBox>
    </Section>
  )
}
