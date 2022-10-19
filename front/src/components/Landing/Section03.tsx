import styled from "styled-components";
import { Container1300 } from "../common/Containers";
import BarLineChart from "./charts/BarLineChart";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { animateFrom, hide } from "../../utils/animateFrom";

gsap.registerPlugin(ScrollTrigger);


const Section = styled.section`
  position: relative;
  background: #F9F7F2;
  padding: 200px 0 300px;
  color: #fff;

  &.colorDark {
    color: #343434;
  }


  ${Container1300} {
    position: relative;
    z-index: 5;
  }
`;

const SectionGradientBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background: linear-gradient(180deg, #192A2E 0%, #2D4D4D 68%, #3D5B5B 100%);
  z-index: 1;
`;

const IsKnowBox = styled.div`
  margin-bottom: 200px;
  text-align : center;

  .descTextBox{
    font-size: 24px;
    font-weight: 300;
    color: #84AEB9;
    letter-spacing: 2px;
    line-height: 3;

    strong {
      color: #ACD1CB;
      font-weight: 400;
    }
  }
`

const ChartBox = styled.div`
  width: 800px;
  margin: 100px auto;
`

const Sources = styled.p`
  margin: 20px 20px 0;
  text-align: right;
  font-size: 12px;
  color: #84AEB9;
  opacity: .6;
`

const SimpleEmissionsBox = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 0 40px;
`
const EmissionsItem = styled.div`
  padding: 100px 0;
  font-weight: 300;
  
  .title{
    font-size: 18px;
    color: #ACD1CB;
    margin-bottom: 80px;
  }
  .emissions{
    letter-spacing: .02em;
    font-size: 46px;

    .unit {
      font-size: 30px;
    }
  }
`;

const ReasonTextBox = styled.div`
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  color: #ACD1CB;
  line-height: 3;

  strong {
    font-size: 32px;
    font-weight: 400;
    margin: 0 10px;
    color: #fff;
  }
`;




export default function Section03() {

  const EmissionsList = [
    {
      title: "1인당 하루 생활쓰레기 배출량",
      emissions : "0.92",
      unit: "kg"
    },
    {
      title: "대한민국 하루 생활쓰레기 배출량",
      emissions : "47,407",
      unit: "ton"
    },
    {
      title: "대한민국 연간 생활쓰레기 배출량",
      emissions : "17,303,386",
      unit: "ton"
    },
  ];

  const bgRef = useRef<any>(null);
  const sectionRef = useRef<any>(null);
  
  useEffect(() => {
    gsap.utils.toArray(".gs_reveal").forEach(function(elem: any) {
      ScrollTrigger.create({
        trigger: elem,
        start: "50% bottom",
        scrub: 1,
        onEnter: () => { animateFrom(elem); }, 
        onLeaveBack: () => { hide(elem); },
      });
    });


    const bgEl = bgRef.current;
    const sectionEl = sectionRef.current;

    ScrollTrigger.create({
      trigger: ".bgTrigger",
      start: "150% bottom",
      markers: true,
      onEnter: () => { 
        gsap.to(bgEl, {
          opacity: 0,
          duration: .4
        });
        sectionEl.classList.add("colorDark");
      }, 
      onLeaveBack: () => {
        gsap.to(bgEl, {
          opacity: 1,
          duration: .4
        });
        sectionEl.classList.remove("colorDark");
      },
    });


  }, []);


  return (
    <Section id="section03" ref={sectionRef}>
      <SectionGradientBg ref={bgRef}/>
      <Container1300>
        <IsKnowBox>
          <div className="descTextBox">
            <p className="gs_reveal gs_reveal_fromTop"><strong>하지만,</strong> 많은 노력과 관심에도 불구하고 </p>
            <p className="gs_reveal gs_reveal_fromTop delay600">심각한 환경문제 중 하나인 <strong>생활쓰레기 배출량</strong>은 점점 더 <strong>증가</strong>하고 있다는 것을 알고 계시나요?</p>
          </div>
          <ChartBox className="chartBox">
            <BarLineChart />
            <Sources>자료출처 : KOSIS 국가통계포털 생활폐기물 발생현황 (2014-2020)</Sources>
          </ChartBox>
          <SimpleEmissionsBox>
            {EmissionsList.map(({title, emissions, unit}, idx) =>( 
              <EmissionsItem key={title + emissions} className={`gs_reveal gs_reveal_fromBottom delay${idx*400}`}>
                <div className="title">{title}</div>
                <div className="emissions">
                  <span>{emissions}</span> <span className="unit">{unit}</span>
                </div>
              </EmissionsItem>
            ))}
          </SimpleEmissionsBox>
        </IsKnowBox>
        <ReasonTextBox className="bgTrigger">
          <p>이렇게 많은 양의 생활쓰레기를 해결하기 위해 <br /> <strong>업사이클링 (upcycling)</strong>에 대한 관심이 높아지고 있습니다.</p>
        </ReasonTextBox>
      </Container1300>
    </Section>
  );
}
