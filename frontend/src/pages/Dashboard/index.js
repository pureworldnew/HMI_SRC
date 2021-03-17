import React, { useContext, useState } from "react";
import StatCard from "./StatCard";
import SmallCharts from "./SmallCharts";
import BarChart from "./BarChart";

import { StateContext } from "../../StateContextProvider";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import Header from "./Header";

const data = {
  revenue: 23400000,
  revenuePrev: 22493048,
  netRevenueRetention: 450100,
  netRevenueRetentionPrev: 123400,
  logoRetentionRate: 32,
  logoRetentionRatePrev: 18,
  accountsReceivable: 213,
  accountsReceivablePrev: 81,
  productEngagement: 88,
  productEngagementPrev: 85,
  noOfCustomers: 20,
  totalNoOfCustomers: 80,
  upSellThisMonth: 70,
  totalUpSell: 100,
  downSellThisMonth: 20,
  totalDownSell: 100
};

const Dashboard = () => {
  let loggedInUser = localStorage.getItem('username');
  const [{ user }] = useContext(StateContext);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });
  let firstName = loggedInUser ? loggedInUser.split(' ') : '-';


  return (
    <div className="dashboard">
      <Header
        title="Welcome home,"
        subTitle={firstName.length && firstName[0]}
        date={date}
        setDate={setDate}
      />

      <div className="dashboard__statsGrid">
        <StatCard
          title="Revenue"
          main={data.revenue}
          reduceToMillion={true}
          bottom={data.revenuePrev}
          unit="dollar"
          grid={1}
        />
        <StatCard
          title="Net Revenue Retention (NRR)"
          main={data.netRevenueRetention}
          bottom={data.netRevenueRetentionPrev}
          unit="dollar"
          grid={2}
        />
        <StatCard
          title="Logo Retention Rate"
          main={data.logoRetentionRate}
          bottom={data.logoRetentionRatePrev}
          unit="percentage"
          grid={3}
        />
        <StatCard
          title="Accounts Receivable"
          main={data.accountsReceivable}
          bottom={data.accountsReceivablePrev}
          grid={4}
        />
        <StatCard
          title="Product Engagement"
          main={data.productEngagement}
          bottom={data.productEngagementPrev}
          unit="percentage"
          grid={5}
        />
        <SmallCharts data={data} />
      </div>
      <BarChart />
    </div>
  );
};

export default Dashboard;
