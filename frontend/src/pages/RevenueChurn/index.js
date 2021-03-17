import React, { useState } from 'react';
import Header from '../Dashboard/Header';
import Overview from './Overview';
import ChurnArr from './ChurnArr';
import HorizontalTab from '../../components/HorizontalTab';
import StatCard from '../Dashboard/StatCard';

const data = {
  churned: 230988,
  churned_bottom: 180023,
  sharp_churned: 23,
  sharp_churned_bottom: 11,
  number_of_reports: 6,
  number_of_reports_bottom: 2,
  reports: 2,
  reports_bottom: 8
};

const RevenueChurn = () => {
  // const [activeTab, setActiveTab] = useState('Churn by Reason');
  const [activeTab, setActiveTab] = useState('Churn by Reason');
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });

  const getActiveTabContent = () => {
    if (activeTab === 'Churn by Reason') {
      return <Overview />;
    } else {
      return <ChurnArr />;
    }
  };

  return (
    <div className="dashboard revenue-insights">
      <Header
        title="Revenue Management"
        subTitle="Churn"
        date={date}
        setDate={setDate}
        type="Revenue-Churn"
      />
      <HorizontalTab
        tabs={['Churn by Reason', 'Churn % of ARR']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="revenue-insights__statsGrid">
        <StatCard
          page="revenue-churn"
          title="$ Churned"
          main={data.churned}
          bottom={data.churned_bottom}
          bottom_dollar="true"
          unit="dollar"
          grid={1}
        />
        <StatCard
          page="revenue-churn"
          title="# Churned"
          main={data.sharp_churned}
          bottom={data.sharp_churned_bottom}
          grid={2}
        />
        <StatCard
          page="revenue-churn"
          title="Number of Reports"
          main={data.number_of_reports}
          bottom={data.number_of_reports_bottom}
          grid={3}
        />
        <StatCard
          page="revenue-churn"
          title="Reports"
          main={data.reports}
          bottom={data.reports_bottom}
          grid={4}
        />
      </div>
      {getActiveTabContent()}
    </div>
  );
};

export default RevenueChurn;
