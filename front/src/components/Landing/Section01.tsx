import { useEffect, useState } from "react"
import styled from "styled-components"
import LandingImgs from "./LandingImgs"
import MountainsParallaxItems from "./MountainsParallaxItems"

const InnerBox = styled.div`
  position: relative;
  height:100%;
  transform-origin: 50% 0;
  transition : transform 1.8s;
  transform: scaleY(1.1);
`

const Section = styled.section`
  position: relative;
  height: 100vh;
  text-align:center;
  background: #d0e2db;
  overflow: hidden;
  user-select:none;
  &.active{
    ${ InnerBox }{
      transform: scaleY(1);
      
      .titleBox, .mainDescTextBox{
        opacity: 1;
      }
    }
  }
`

const TitleBox = styled.div`
  opacity: 1;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index : 10;
  transition : opacity 1.3s 1s;
  font-size: 30px;
  font-family: 'RIDIBatang';
  color: rgba(26, 44, 48, .7);
`

const MainDescTextBox = styled.div`
  opacity: 0;
  position: absolute;
  top: 47%;
  left: 50%;
  width: 980px;
  z-index : 10;
  font-family: 'KOTRA_BOLD-Bold';
  font-size: 80px;
  color: #1A2C30;
  transform: translate(-50%, -50%);
  mix-blend-mode: overlay;
  transition : opacity 2s 1.5s;
  
  p {
    display: flex;
    justify-content: space-between;
    letter-spacing: .06em;

    span {
      letter-spacing: .4em;
    } 
  }
`

export default function Section01() {
  const zIndex = [5,4,3,2,1];
  const [isLoading, setIsLoading] = useState(false);
  const handleWindowScrollTitleMove=()=>{

  }
  useEffect(()=>{
    setIsLoading(true);
  },[])
  
  return (
    <Section id="section01" className={isLoading ? 'active' : ""}>
      <TitleBox className="titleBox">
        다시, 다 프로젝트
      </TitleBox>
      <InnerBox>
        <MainDescTextBox className="mainDescTextBox">
          <p><span>당신은</span> <span>지구를</span> <span>위해</span></p>
          <p>어떤 노력을 하고 있나요?</p>
        </MainDescTextBox>
        {LandingImgs.section01Imgs.map((ele,idx) => (
          <MountainsParallaxItems key={ele + idx} isLoading={isLoading} bgImage={ele} idx={idx} zIndex={zIndex[idx]}/>
        ))}
      </InnerBox>
    </Section>
  )
}
