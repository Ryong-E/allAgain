import { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  { name: "불안하지 않음", value: 21.17, desc: "전혀 불안하지 않음 4.31%, 별로 불안하지 않음 16.86%" },
  { name: "불안함", value:  78.83, desc: "매우 불안함 11.34%, 약간 불안함 33.46%" },
];

const COLORS = ['#4E6D75', '#B4E0D9'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = startAngle > 90 ? Math.sin(RADIAN * midAngle) : Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={26} >
        {payload.name}
        {payload.name === "불안함" && (
          <tspan fontSize={13} fill={"#4E6D75"} x={cx} y={cy} dy={36}>(보통 응답 34.02% 포함)</tspan>
        )}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={26}
        fontFamily={'SpoqaHanSansNeo-Regular'}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={22}
        textAnchor={textAnchor}
        fill={"#4E6D75"}
        fontSize={11}
      >
        {`(${payload.desc})`}</text>
    </g>
  );
};

export default function CustomActivePieChart2() {

  const [showChart, setShowChart] = useState(false);

  const [activeIndex, setActiveIndex] = useState(1);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".pieChart",
      start: "top bottom",
      onEnter: () => { setShowChart(!showChart); },
      onLeaveBack: () => { setShowChart(false); console.log("leaveBack");},
    });

  }, []);  




  return (
    <PieChart width={650} height={500} className="pieChart">
      {
        showChart && (
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={360}
            cy={250}
            innerRadius={140}
            outerRadius={190}
            startAngle={90}
            endAngle={450}
            fill="#ACD1CB"
            dataKey="value"
            onMouseDown={onPieEnter}
            onMouseLeave={() => setActiveIndex(1)}
            animationDuration={1400}
            style={{cursor: "pointer"}}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={"#192A2E"} strokeWidth={8} />
            ))}
          </Pie>
        )
      }
    </PieChart>
  );
}
