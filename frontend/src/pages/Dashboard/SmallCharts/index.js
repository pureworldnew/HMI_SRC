import React from "react";
import SmallChart from "../SmallChart";

const SmallCharts = ({ data }) => {
  return (
    <div className="smallChartsContainer">
      <SmallChart
        title="Number Of Customers"
        value={data.noOfCustomers}
        total={data.totalNoOfCustomers}
      />
      <SmallChart
        title="Upsell This Month"
        value={data.upSellThisMonth}
        total={data.totalUpSell}
      />
      <SmallChart
        title="Downsell This Month"
        value={data.downSellThisMonth}
        total={data.totalDownSell}
      />
    </div>
  );
};

export default SmallCharts;
