import { useEffect } from "react";
import styled from "styled-components";
import { Container } from "../../components/common/Containers";
import Section01 from "../../components/Landing/Section01";
import Section02 from "../../components/Landing/Section02";
import Section03 from "../../components/Landing/Section03";
import Section04 from "../../components/Landing/Section04";
import { animateFrom, hide } from "../../utils/animateFrom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const LandingRoot = styled(Container)`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
`;

export default function LandingPage() {

  useEffect(() => {
    gsap.utils.toArray(".gs_reveal").forEach(function(elem: any) {
      ScrollTrigger.create({
        trigger: elem,
        start: "50% bottom",
        onEnter: () => { animateFrom(elem); console.log("왜 두번"); }, 
        onLeaveBack: () => { hide(elem); },
      });
    });
  }, []);

  return (
    <LandingRoot>
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
    </LandingRoot>
  )
}
