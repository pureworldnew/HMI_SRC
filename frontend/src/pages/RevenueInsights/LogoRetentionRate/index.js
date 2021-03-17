import React from "react";
import StatCard from "../../Dashboard/StatCard";
import BarChart from "./BarChart";
import InsightsHeader from '../InsightsHeader';

const LogoRetentionRate = () => {
  return (
    <div className="net-revenue-retention">
      <InsightsHeader />
      <BarChart />
    </div>
  );
};

export default LogoRetentionRate;
