import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    name: "2014",
    "생활쓰레기 발생량": 15459648,
  },
  {
    name: "2015",
    "생활쓰레기 발생량": 15845088,
  },
  {
    name: "2016",
    "생활쓰레기 발생량": 16593009.5,
  },
  {
    name: "2017",
    "생활쓰레기 발생량": 16428248.5,
  },
  {
    name: "2018",
    "생활쓰레기 발생량": 17063494.5,
  },
  {
    name: "2019",
    "생활쓰레기 발생량": 16760917.7,
  },
  {
    name: "2020",
    "생활쓰레기 발생량": 17303386.4,
  },
];


const CustomTooltipWrap = styled.div`
  background: rgba(255,255,255,.95);
  padding: 15px 20px;
  text-align: left;
  color: #343434;
  border: 1px solid #dcdcdc;
  box-shadow: 2px 2px 5px rgba(25,42,46,.3);

  p.value {
 
    color: #D76440;

    &.exact {
      font-size: 16px;
      font-weight: 600;
    }
  }
  
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipWrap className="custom-tooltip">
        <p className="label">{`${label} 년 생활쓰레기 발생량`}</p>
        <p className="value exact">{payload[0].value.toLocaleString()} 톤</p>
        <p className="value">(약 {Math.round(payload[0].value / 10000)}만 톤)</p>
      </CustomTooltipWrap>
    );
  }

  return null;
};


export default function BarLineChart() {

  const ticks = [15000000, 15500000, 16000000, 16500000, 17000000, 17500000];

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".barLineChart",
      start: "50% bottom",
      onEnter: () => { setShowChart(!showChart) },
      onLeaveBack: () => {setShowChart(false); },
    });
  }, []);


  return (

    <ComposedChart
      className="barLineChart"
      width={800}
      height={600}
      data={data}
      margin={{
        top: 50,
        right: 20,
        bottom: 40,
        left: 20
      }}
    >
      <CartesianGrid strokeDasharray="3 3" style={{opacity: .2, stroke: "#B4E0D9"}}/>
      <XAxis 
        dataKey="name" 
        padding={{ left: 20, right: 20 }} 
        axisLine={{stroke: "#69919B"}} 
        tick={{fill: "#69919B"}} 
        tickLine={{stroke: "#69919B"}} 
        label={{ value: "연도(년)", position: 'insideBottomCenter', offset: 0, fill: "#84AEB9", dy: 30 }} 
        dy={7}
      />
      <YAxis 
        type="number" 
        ticks={ticks} 
        allowDecimals={false} 
        domain={[15000000, 17500000]} 
        label={{ value: "톤(ton)", position: "insideTop", fill: "#84AEB9", dy: -45, dx: -4 }} 
        axisLine={{stroke: "#69919B"}} 
        tick={{fill: "#69919B"}} 
        tickLine={{stroke: "#69919B"}} 
        dx={-7}
      />
      <Tooltip content={<CustomTooltip />}/>
      {
        showChart && (
          <>
            <Bar dataKey="생활쓰레기 발생량" fill="#B4E0D9" barSize={60}  animationBegin={0} animationDuration={1200} />
            <Line type="monotone" dataKey="생활쓰레기 발생량" stroke="#D76440" strokeWidth={1.5} dot={{ stroke: "#D76440", strokeWidth: 1 }} activeDot={{ stroke: "#D76440", strokeWidth: 2, r: 2 }}  animationBegin={1200} animationDuration={1400} />
          </>
        )
      }
    </ComposedChart>
  );

}
