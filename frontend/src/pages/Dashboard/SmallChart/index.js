import React from "react";

const SmallChart = ({ title, value, total }) => {
  return (
    <div className="smallChartContainer">
      <p className="smallChart_title">{title}</p>
      <p className="smallChart_main">{value}</p>
      <div className="smallChart_bottom">
        <p>Previous Month: {total}</p>
        <i
        // className={hasIncreased ? "ft-arrow-up-right" : "ft-arrow-down-left"}
        ></i>
      </div>
    </div>
  );
};

export default SmallChart;
