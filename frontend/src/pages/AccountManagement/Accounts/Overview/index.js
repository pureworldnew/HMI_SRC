import React from "react";
import StatCard from "../../../Dashboard/StatCard";

const data = {
  managedRevenue: 23400000,
  annualRecurringRevenuePrev: 22,
  loginVsLastDays: 10,
  loginVsLastDaysPrev: 20,
  productEngagement: 107,
  productEngagementPrev: 92,
  featureEngagement: 26,
  featureEngagementPrev: 22
};

const Overview = () => {
  return (
    <div className="annual-recurring-revenue">
      <div className="revenue-insights__statsGrid">
        <StatCard
          title="Managed Revenue"
          main={data.managedRevenue}
          reduceToMillion={true}
          bottom={data.annualRecurringRevenuePrev}
          unit="dollar"
          grid={1}
        />
        <StatCard
          title="Logins vs Last 90 days"
          main={data.loginVsLastDays}
          bottom={data.loginVsLastDaysPrev}
          unit="percentage"
          grid={2}
        />
        <StatCard
          title="Product Engagement vs. Last 90 days"
          main={data.productEngagement}
          bottom={data.productEngagementPrev}
          unit="percentage"
          grid={3}
        />
        <StatCard
          title="Feature Engagement vs. Last 90 days"
          main={data.featureEngagement}
          bottom={data.featureEngagementPrev}
          unit="percentage"
          grid={4}
        />
      </div>
    </div>
  );
};

export default Overview;
