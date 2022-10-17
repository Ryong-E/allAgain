import React from 'react'
import styled from 'styled-components'

const ChartListBox = styled.div`
  

`
const ChartFlex = styled.div`
  display:flex;
  & + &{
    margin-top: 300px;
  }
  > div{
    width: 50%;
    display:flex;

  }

  .chart{
    flex-direction :column;
    div{
      width:560px;
      height:360px;
      border:1px solid #fff;
    }
  }

  .chartDesc{
    justify-content:center;
    align-items:center;
    font-size: 18px;
    letter-spacing: 1px;
    line-height : 1.8;
    opacity: .8;
  }

  &.reverse{
    flex-direction: row-reverse;
    .chart{
      flex-direction :row;
      span{
        word-break: keep-all;
        width: 200px;
        margin: auto auto 0;
        text-aling:right;
      }
    }
    .chartDesc{
      text-align:right;
    }
  }
`

const Sources = styled.span`
  font-size: 12px;
  opacity: .5;
`

export default function ChartFlexBox() {
  const sourcesList = ["자료출처 : KOSIS 국가통계포털 환경문제에 대한 인식 (2012 - 2022)", "자료출처 : KOSIS 국가통계포털 환경오염 방지 노력 (2020년 기준)"]
  const ChartDescList = ["최근 우리나라 국민 중 ~~만큼의 사람들이\n환경문제에 대해 불안함을 느끼고 있습니다.","그만큼 많은 사람들이 환경문제에 관심을 가지고\n문제 해결을 위해 노력하고 있습니다."]
  return (
    <ChartListBox>
      {ChartDescList.map((ele, idx) =>(
        <ChartFlex className={ idx% 2 !== 0 ? "reverse" : ""}>
          <div className="chart">
            <div></div>
            <Sources>{sourcesList[idx]}</Sources>
          </div>
          <div className="chartDesc">
            {ele.split("\n").map((obj,idx) =>(
              <>{obj}{idx === 0 && <br/>}</>
            ))}
          </div>
        </ChartFlex>
      ))}
    </ChartListBox>
  )
}
