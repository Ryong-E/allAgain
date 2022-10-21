import { useEffect, useRef } from "react";
import styled from "styled-components"
import topBg from "../../assets/images/main_top_bg.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const TopBgWrap = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  margin: 0px auto 0 0;
  border-radius: 0 0 300px 0px;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 0 300px 0px;
    box-shadow: inset -30px -30px 40px 2px rgba(159, 85, 56, .3);
    z-index: 5;
  }
`;

const TopBg = styled.div`
  width: 100%;
  height: 100%;
  background: url(${topBg}) no-repeat 50% 50%/cover fixed;
`;

const TopText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  // color: #fff;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  font-size: 110px;
  letter-spacing: .06em;
  word-spacing: .3em;
  mix-blend-mode: overlay;
  opacity: .8;
`;



export default function MainTop() {

  const parallaxRef = useRef<any>(null);
  const bgRef = useRef<any>(null);


  useEffect(() => {
    const parallax = parallaxRef.current;
    const bg = bgRef.current;
    const innerHeight = parallax.offsetHeight;
  
    bg.style.backgroundPosition = `50% ${innerHeight / 2}px`;

    gsap.to(bg, {
      backgroundPosition: `50% ${-innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: parallax,
        scrub: true
      }
    });
  }, []);

  return (
    <TopBgWrap ref={parallaxRef}>
      <TopBg ref={bgRef}/>
      <TopText>
        <p>When you throw it away</p>
        <p>there is no away</p>
      </TopText>
    </TopBgWrap>
  )
}