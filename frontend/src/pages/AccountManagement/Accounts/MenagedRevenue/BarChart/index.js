import React from "react";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip } from "recharts";

const CustomizedLabel = props => {
  const { x, y, value } = props;
  return (
    <text
      className="barChartLabel"
      x={x + props.viewBox.width / 2}
      y={y + props.viewBox.height / 2 + 5}
      dy={-4}
      fill={"white"}
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const BC = () => {
  const data = [
    {
      month: "Jan",
      value: 320
    },
    {
      month: "Fed",
      value: 250
    },
    {
      month: "Mar",
      value: 310
    },
    {
      month: "Apr",
      value: 290
    },
    {
      month: "May",
      value: 356
    },
    {
      month: "Jun",
      value: 190
    },
    {
      month: "Jul",
      value: 260
    },
    {
      month: "Sep",
      value: 358
    },
    {
      month: "Oct",
      value: 340
    },
    {
      month: "Nov",
      value: 290
    },
    {
      month: "Dec",
      value: 200
    }
  ];

  return (
    <div className="barChartContainer" style={{alignItems: 'flex-start'}}>
      <div className="barChart__header">
        <h3 style={{fontSize: "1.8rem", margin: 10, marginBottom: 30}}>Menaged Revenue</h3>
        <div className="barChart__legend">
        </div>
      </div>
      <div className="barChartWrapper" style={{width: '100%'}}>
        <ResponsiveContainer
          height={300}
        >
          <BarChart
         
          data={data}
          margin={{
            top: 5, right: 0, left: -25, bottom: 5,
          }}
          barSize={70}
        >
          <XAxis 
            dataKey="month"
            padding={{ left: 30, right: 30 }}
           />
          <YAxis dataKey="value"/> 
          <Tooltip />
          <Bar dataKey="value" fill="#000"  label={<CustomizedLabel />}/>
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BC;
