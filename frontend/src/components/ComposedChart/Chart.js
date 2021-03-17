import React, { Component } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line
} from 'recharts';
import ChartTooltip from './ChartTooltip';

export default class Chart extends Component {
  render() {
    const { data } = this.props;

    const chartAttr = {
      barGap: 0,
      barCategoryGap: 22
    };
    const barAttr = {
      radius: [8, 8, 0, 0],
      barSize: 36
    };

    const CustomYAxisTick = (props) => {
      const { x, y, payload } = props;
      return (
        <g transform={`translate(${0},${y})`}>
          <text x={0} y={0} textAnchor="start" fill="#666">
            $ {payload.value}
          </text>
        </g>
      );
    };

    return (
      <ResponsiveContainer width="100%" height={445}>
        <ComposedChart
          {...chartAttr}
          data={data}
          margin={{
            top: 52,
            right: 0,
            left: 0,
            bottom: 5
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />

          <YAxis
            yAxisId="left"
            type="number"
            dataKey="recurring_revenue"
            orientation="left"
            axisLine={false} tickLine={false}  tick={<CustomYAxisTick />}
          />
          <YAxis
            yAxisId="right"
            type="number"
            dataKey="churn"
            orientation="right"
            unit="%"
          />

          <Tooltip content={<ChartTooltip />} coordinate={{ x: 445 }} />
          <Bar
            yAxisId="left"
            dataKey="recurring_revenue"
            fill="#1C5DE1"
            {...barAttr}
          />
          <Bar yAxisId="left" dataKey="churn" fill="#3CD278" {...barAttr} />
          <Line
            yAxisId="right"
            dataKey="churn_arr"
            stroke="#EB367E"
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
