import React from 'react';
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import themeVars from '../../styles/_normalization.scss';

function sliceFormatter(num, barFormat) {
  const { slice } = barFormat;
  let value = 0;
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  value = (num / si[i].value).toFixed(slice).replace(rx, '$1') + si[i].symbol;

  return value;
}

const sliceFormater = (format, value) => {
  if (format.format && format.position) {
    switch (format.position) {
      case 'right':
        return `${sliceFormatter(value, format)}${format.format}`;
      case 'left':
        return `${format.format}${sliceFormatter(value, format)}`;
      default:
        break;
    }
  } else {
    return `${sliceFormatter(value, format)}`;
  }
};

const labelFormater = (format, value) => {
  if (format.format && format.position) {
    switch (format.position) {
      case 'right':
        return `${value}${format.format}`;
      case 'left':
        return `${format.format}${value}`;
      default:
        break;
    }
  }
  return `${value}`;
};

const CustomizedLabel = (props) => {
  const { x, y, value, format, height } = props;
  const { singleBar } = format;
  let label = labelFormater(
    format,
    parseInt(value)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );

  if (singleBar) {
    const stringHeight = 25;
    const yOnTop = height < stringHeight;
    return (
      <text
        className="barChartLabel"
        x={x + props.viewBox.width / 2}
        y={yOnTop ? y - 5 : y + props.viewBox.height / 2 + 5}
        dy={-4}
        fill={yOnTop ? themeVars.headings : 'white'}
        textAnchor="middle">
        {sliceFormater(format, value)}
      </text>
    );
  }
  return (
    <text
      className="barChartLabel"
      x={x + props.viewBox.width / 2}
      y={y + props.viewBox.height / 2 + 7}
      dy={-4}
      fill={'white'}
      textAnchor="middle">
      {sliceFormater(format, value)}
    </text>
  );
};

// barChar attributes
let BarChartAttributes = function (data, width, height) {
  return {
    data: data,
    width: width,
    height: height,
    barAmountGap: 20,
    margin: { top: 50, right: 0, left: -15, bottom: 15 },
    barSize: 70
  };
};
// barChar x axis attributes
let XAxisAttributes = function (xKey, color) {
  return {
    dataKey: xKey,
    tick: { fill: color },
    padding: { left: 0, right: 0 },
    dy: 14,
    scale: 'auto',
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.01em',
    orientation: 'bottom'
  };
};
// barChar y axis attributes
let YAxisAttriburtes = function (color, format) {
  const sliceForm = format.slice;
  return {
    axisLine: false,
    dx: -13,
    fontWeight: 'normal',
    fontSize: '14px',
    tick: { fill: color },
    tickFormatter: sliceForm
      ? sliceFormater.bind(null, format)
      : labelFormater.bind(null, format),
    padding: { left: 30 },
    tickSize: 0,
    width: format.slice ? 90 : 60
  };
};
// barChar bar attributes
let BarAttributes = function (
  barKeys,
  key,
  index,
  color,
  colorStack,
  CustomizedLabel,
  format,
  stacked
) {
  // settings to bar radius (for single bar or multiple bar)
  let barRadius = [];
  if (stacked) {
    barRadius = barKeys.length - 1 === index ? [8, 8, 0, 0] : [0, 0, 0, 0];
  } else {
    barRadius = barKeys.length > 2 ? [4, 4, 0, 0] : [8, 8, 0, 0];
  }
  return {
    key: `${key}-${index}`,
    stackId: stacked ? stacked : `${key}-${index}`,
    dataKey: key,
    fill: index < 1 ? color : colorStack[index],
    barCategoryGap: 2,
    radius: barRadius,
    label: <CustomizedLabel dateType="date" format={format} />
    // ?????
    // [stacked ? 'barSize' : '']: 70,
  };
};

const CustomBarChart = (props) => {
  let { data, width, height, dateType } = props;
  let barChartAttr = new BarChartAttributes(data, width, height);
  let colorStack = props.colors
    ? props.colors
    : ['#333', '#626060', '#777', '#8c8686', '#a79d9d'];
  let [xKey, ...barKeys] = [];
  // let barSetup = {};
  if (dateType === 'date') {
    // set x axis name, value for bar
    // let xAxisName = null;
    barKeys = data.length ? Object.keys(data[0]) : [];
    xKey = barKeys[barKeys.length - 1];
    barKeys.pop();
  } else {
    // console.log('loss ex chart: ', data.length ? Object.keys(data[0]) : []);
    [xKey, ...barKeys] = data.length ? Object.keys(data[0]) : [];
  }

  //const stackedBarType = Object.keys(data[0]).length > 2;
  let defaultColor = themeVars.headings;
  let xAxisAttr = new XAxisAttributes(xKey, defaultColor);
  let yAxisAttr = new YAxisAttriburtes(defaultColor, props.format);

  // console.log('chart value: ', xAxisAttr, yAxisAttr);

  // if (barKeys.length > 2) {
  //   delete barChartAttr.barSize;
  // }
  // if (stackedBarType) {
  //   yAxisAttr = new YAxisAttriburtes(defaultColor, props.format);
  // } else {
  //   const { format, position} = props.format;
  //   const customFormat = { format, position, slice: 1, labelOnTOp: true };
  //
  //   yAxisAttr = new YAxisAttriburtes(defaultColor, customFormat);
  // }

  return (
    <ResponsiveContainer height={height} width="100%">
      <BarChart {...barChartAttr}>
        <XAxis {...xAxisAttr} />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={themeVars.elements1}
        />
        <YAxis {...yAxisAttr} />
        {props.tooltip ? <Tooltip cursor={{ fill: 'transparent' }} /> : <></>}
        {barKeys ? (
          barKeys.map((key, index) => {
            let barAttr = new BarAttributes(
              barKeys,
              key,
              index,
              '#1C5DE1',
              colorStack,
              CustomizedLabel,
              props.format,
              props.stacked ? 'stacked' : null
            );

            if (barKeys.length > 2 && !props.stacked) delete barAttr.label;
            return !isNaN(data[0][key]) ? <Bar {...barAttr} /> : null;
          })
        ) : (
          <></>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};
export default CustomBarChart;
