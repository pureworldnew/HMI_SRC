import React from "react";
import StatCard from "../../Dashboard/StatCard";
import BarChart from "./BarChart";
import InsightsHeader from '../InsightsHeader';

const data = {
  annualRecurringRevenue: 23400000,
  annualRecurringRevenuePrev: 22493048,
  customers: 24,
  customersPrev: 28,
  netRevenueRetention: 107,
  netRevenueRetentionPrev: 92,
  logoRetentionRate: 26,
  logoRetentionRatePrev: 22
};

const NetRevenueRetention = () => {
  return (
    <div className="net-revenue-retention">
      <InsightsHeader />
      <BarChart />
    </div>
  );
};

export default NetRevenueRetention;
