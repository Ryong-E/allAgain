import styled from "styled-components"

const IsKnowBox = styled.div`
  padding : 400px 0 0;
  text-align : center;
  .descTextBox{
    font-size: 24px;
    letter-spacing: 2px;
  }
`

const ChartBox = styled.div`
  width:800px;
  height:500px;
  border: 1px solid #000;
  margin : 200px auto 250px;
  display:flex;
  flex-direction : column;
  justify-content: space-between;
  .chart {
    width:100%;
    height:95%;
    border: 1px solid #000;
  }
`

const Sources = styled.span`
  text-align:right;
  font-size: 12px;
  opacity: .5;
`

const SimpleEmissionsBox = styled.div`
  display:flex;
  justify-content: space-evenly;
`
const EmissionsItem = styled.div`
  color: ${({theme}) => theme.colors.white};
  .title{
    font-size: 20px;
    margin-bottom: 80px;
  }
  .emissions{
    font-size: 38px;
  }
`

export default function IsKnow() {
  
  const EmissionsList = [
    {
      title: "1인당 하루 생활쓰레기 배출량",
      emissions : "0.92",
      unit: "Kg"
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
]
  return (
    <IsKnowBox>
      <div className="descTextBox">
        하지만, 많은 노력과 관심에도 불구하고 <br />
        우리나라의 생활 쓰레기 배출량은 매년 증가하고 있다는 것을 알고 계시나요?
      </div>
      <ChartBox className="chartBox">
        <div className="chart"></div>
        <Sources>자료출처 : KOSIS 국가통계포털 생활폐기물 발생현황 (2014-2020)</Sources>
      </ChartBox>
      <SimpleEmissionsBox>
        {EmissionsList.map(({title, emissions, unit}) =>( 
          <EmissionsItem key={title + emissions}>
            <div className="title">{title}</div>
            <div className="emissions">
              <span>{emissions}</span> {unit}
            </div>
          </EmissionsItem>
        ))}
      </SimpleEmissionsBox>
    </IsKnowBox>
  )
}
