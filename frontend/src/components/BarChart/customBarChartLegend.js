import React from 'react';
// import { IconButton } from '@material-ui/core';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const LegendItem = (props) => {
  return (
    <div className="barChart__legend-item">
      <div
        className="barChart__legend-mark"
        style={{ backgroundColor: props.color }}
      />
      <p className="barChart__legend-text">{props.label}</p>
    </div>
  );
};

const CustomBarChartLegend = (props) => {
  let { data, colors, dateType } = props;
  let [x, ...clients] = [];

  // console.log('CustomBarChartLegend: ', Object.keys(data[0]));
  if (dateType === 'date') {
    clients = data.length ? Object.keys(data[0]) : [];
    clients.pop()
  } else {
    [x, ...clients] = data.length ? Object.keys(data[0]) : [];
  }

  return (
    <>
      {clients.length > 2
        ? clients.map((client, index) => {
          return (
            <LegendItem
              key={`${client}-${index}`}
              color={colors[index]}
              label={client}
            />
          );
        })
        : null}
      {props.children}
    </>
  );
};
export default CustomBarChartLegend;
