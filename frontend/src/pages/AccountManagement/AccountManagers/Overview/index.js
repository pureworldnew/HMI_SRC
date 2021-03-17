import React from "react";
import StatCard from "../../../Dashboard/StatCard";

const data = {
  managedRevenue: 23400000,
  managedRevenuePrev: 22,
  logins: 84,
  loginsPrev: 88,
  productEngagement: 91,
  productEngagementPrev: 74,
  featureEngagement: "70%",
  featureEngagementPrev: "60%"
};

const Overview = () => {
  return (
    <div className="annual-recurring-revenue">
      <div className="revenue-insights__statsGrid">
        <StatCard
          title="Managed Revenue"
          main={data.managedRevenue}
          reduceToMillion={true}
          bottom={data.managedRevenuePrev}
          unit="dollar"
          grid={1}
        />
        <StatCard
          title="Logins"
          main={data.logins}
          bottom={data.loginsPrev}
          grid={2}
        />
        <StatCard
          title="Product Engagement"
          main={data.productEngagement}
          bottom={data.productEngagementPrev}
          unit="percentage"
          grid={3}
        />
        <StatCard
          title="Feature Engagement"
          main={data.featureEngagement}
          bottom={data.featureEngagementPrev}
          grid={4}
        />
      </div>
    </div>
  );
};

export default Overview;
