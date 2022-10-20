import { PureComponent, useEffect, useRef, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    name: '2010',
    "매우 노력함": 34.55,
    "약간 노력함": 45.20,
    "별로 노력하지 않음": 17.60,
    "전혀 노력하지 않음": 1.65,
  },
  {
    name: '2012',
    "매우 노력함": 35.45,
    "약간 노력함": 45.15,
    "별로 노력하지 않음": 18.65,
    "전혀 노력하지 않음": 1.85,
  },
  {
    name: '2014',
    "매우 노력함": 33.90,
    "약간 노력함": 46.25,
    "별로 노력하지 않음": 18.10,
    "전혀 노력하지 않음": 1.75,
  },
  {
    name: '2016',
    "매우 노력함": 35.30,
    "약간 노력함": 46.00,
    "별로 노력하지 않음": 16.90,
    "전혀 노력하지 않음": 1.85,
  },
  {
    name: '2018',
    "매우 노력함": 33.55,
    "약간 노력함": 45.20,
    "별로 노력하지 않음": 19.00,
    "전혀 노력하지 않음": 2.25,
  },
  {
    name: '2020',
    "매우 노력함": 39.20,
    "약간 노력함": 45.75,
    "별로 노력하지 않음": 13.55,
    "전혀 노력하지 않음": 1.55,
  },
];

const CustomTooltipWrap = styled.div`
  background: rgba(30, 39, 41, .98);
  padding: 15px 20px;
  border: 1px solid #405C63;
  box-shadow: 2px 2px 5px rgba(25,42,46,.3);
  display: flex;
  flex-direction: column-reverse;
  
`;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipWrap className="custom-tooltip">
        {
          payload.map((ele:any) => {
            return <p style={{color: ele.fill}}>{ele.name} : {ele.value} %</p>
          })
        }
      </CustomTooltipWrap>
    );
  }

  return null;
};


export default function StackedBarChart2() {

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".barChart",
      start: "30% bottom",
      onEnter: () => { setShowChart(!showChart)},
      onLeaveBack: () => { setShowChart(false); },
    });

    // gsap.utils.toArray(".barChart").forEach((el:any) => {
    //   ScrollTrigger.create({
    //     trigger: el,
    //     start: "30% bottom",
    //     onEnter: () => { setShowChart(!showChart)},
    //     onLeaveBack: () => { setShowChart(false); console.log("leaveBack");},
    //     markers: true,
    //   });
    // });
  }, []);  

  return (
    <BarChart
      className="barChart"
      width={600}
      height={480}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 10,
        bottom: 30,
      }}
      barSize={60}
    >
      <CartesianGrid strokeDasharray="0 1"/>
      <XAxis 
        dataKey="name" 
        padding={{ left: 20, right: 20 }} 
        tick={{fill: "#4E6D75"}} 
        axisLine={{stroke: "#4E6D75"}} 
        tickLine={{stroke: "#4E6D75"}} 
        // label={{ value: "연도(년)", position: 'insideBottomCenter', offset: 0, fill: "#69919B", dy: 40 }} 
        dy={7}
        unit={"년"}
      />
      <YAxis 
        domain={[0, 100]} 
        ticks={[0, 20, 40, 60, 80 ,100]}
        tick={{fill: "#4E6D75"}} 
        axisLine={{stroke: "#4E6D75"}} 
        tickLine={{stroke: "#4E6D75"}}
        label={{ value: "단위(%)", position: "insideLeft", fill: "#69919B", angle: -90, dx: -5}} 
        dx={-7}
      />
      <Tooltip
        content={<CustomTooltip />}
        cursor={{ fill: "#2e4449" }} 
      />
      <Legend iconType={"square"} iconSize={10} wrapperStyle={{position: "absolute", bottom: 15}}/>

      {
        showChart && (
          <>
            <Bar dataKey="전혀 노력하지 않음" stackId="a" fill="#394F55" animationBegin={0} animationDuration={500} />
            <Bar dataKey="별로 노력하지 않음" stackId="a" fill="#40585E" animationBegin={0} animationDuration={500} />
            <Bar dataKey="약간 노력함" stackId="a" fill="#B4E0D9" animationBegin={400} animationDuration={800} />
            <Bar dataKey="매우 노력함" stackId="a" fill="#C3EBE4" animationBegin={1200} animationDuration={800} />
          </>
        )
      }

    </BarChart>

  );

}
