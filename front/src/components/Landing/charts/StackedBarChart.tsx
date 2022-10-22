import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2010',
    "불안함": 4000,
    "보통": 2400,
    "불안하지않음": 2400,
  },
  {
    name: '2012',
    "불안함": 4000,
    "보통": 2400,
    "불안하지않음": 2400,
  },
  {
    name: '2014',
    "불안함": 4000,
    "보통": 2400,
    "불안하지않음": 2400,
  },
  {
    name: '2016',
    "불안함": 4000,
    "보통": 2400,
    "불안하지않음": 2400,
  },
  {
    name: '2018',
    "불안함": 4000,
    "보통": 2400,
    "불안하지않음": 2400,
  },
  {
    name: '2020',
    "불안함": 4000,
    "보통": 2400,
    "불안하지않음": 2400,
  },
];

export default function StackedBarChart() {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={650}
        height={440}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
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
          dy={7}
        />
        <YAxis 
          tick={{fill: "#4E6D75"}} 
          axisLine={{stroke: "#4E6D75"}} 
          tickLine={{stroke: "#4E6D75"}}
          dx={-7}
        />
        <Tooltip contentStyle={{border: "1px solid #2e4449", background: "rgba(34, 43, 45, .98)"}} cursor={{ fill: "#2e4449" }} />
        <Legend iconType={"square"} iconSize={10} wrapperStyle={{position: "absolute", top: -40}}/>
        <Bar dataKey="불안하지않음" stackId="a" fill="#40585E" />
        <Bar dataKey="보통" stackId="a" fill="#4E6D75" />
        <Bar dataKey="불안함" stackId="a" fill="#B4E0D9" />
      </BarChart>
    </ResponsiveContainer>
  );

}
