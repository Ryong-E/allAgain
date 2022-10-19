import React, { useEffect } from 'react'
import styled from 'styled-components'
import CustomActivePieChart from './charts/PieChart';
import CustomActivePieChart2 from './charts/PieChart2';
import StackedBarChart from './charts/StackedBarChart';
import StackedBarChart2 from './charts/StackedBarChart2';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateFrom, hide } from '../../utils/animateFrom';

gsap.registerPlugin(ScrollTrigger);

const ChartListBox = styled.div`
`;

const ChartFlex = styled.div`
  display:flex;
  color: #69919B;

  > div {
    width: 50%;
    display:flex;

    &.chart{
      flex-direction :column;
      height: 480px;

      svg {
        overflow: visible;
      }
    }

    &.chartDesc{
      justify-content:center;
      align-items:center;
      padding-bottom: 40px;
      font-size: 20px;
      letter-spacing: .06em;
      line-height: 2.6;
      font-weight: 300;

      strong {
        color: #ACD1CB;
        font-weight: 400;
      }
    }
  }

  &.reverse{
    flex-direction: row-reverse;
    
    div.chart{
      align-items: flex-end;
    }

    div.chartDesc{
      padding-left: 0px;
      text-align: center;
    }
  }

  & + & {
    margin-top: 300px;
  }
`

const Sources = styled.span`
  font-size: 12px;
  color: #405C63;
  margin: 30px 50px 0;
`;



export default function ChartFlexBox() {

  useEffect(() => {
    gsap.utils.toArray(".gs_reveal").forEach(function(elem: any) {
      ScrollTrigger.create({
        trigger: elem,
        start: "50% bottom",
        scrub: 1,
        onEnter: () => { animateFrom(elem); console.log("왜 두번"); }, 
        onLeaveBack: () => { hide(elem); },
      });
    });
  }, []);


  const sourcesList = ["자료출처 : KOSIS 국가통계포털 환경문제에 대한 인식 (2022년 기준)", "자료출처 : KOSIS 국가통계포털 환경오염 방지 노력 (2010-2020)"];
  
  return (
    <ChartListBox>
      <ChartFlex className="reverse">
        <div className="chart">
          {/* <StackedBarChart /> */}
          <CustomActivePieChart2 />
          <Sources>{sourcesList[0]}</Sources>
        </div>
        <div className="chartDesc gs_reveal gs_reveal_fromLeft">
          <div>
            환경 문제에 대한 심각성이 나날이 높아지고 있습니다. <br />
            최근 국민들을 대상으로 환경 문제에 대한 <strong>불안감</strong>을 조사한 결과 <br />
            <strong>보통 이상이라는 응답이 약 79%</strong>로 높은 수치를 나타내고 있습니다.
          </div>
        </div>
      </ChartFlex>
      <ChartFlex>
        <div className="chart">
          {/* <CustomActivePieChart /> */}
          <StackedBarChart2 />
          <Sources>{sourcesList[1]}</Sources>
        </div>
        <div className="chartDesc gs_reveal gs_reveal_fromRight">
          <div>
            그만큼 <strong>많은 사람들</strong>이 환경 문제에 대해 <br />
            단순히 심각성을 인지하는 것에서 그치지 않고 <br />
            <strong>환경 오염 방지</strong>를 위해 다양한 <strong>노력</strong>하고 있습니다.
          </div>
        </div>
      </ChartFlex >
    </ChartListBox>
  )
}
