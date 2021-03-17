import React, { useState } from "react";
import Header from "../../Dashboard/Header";
import FeatureEngagement from "./FeatureEngagement";
import ProductEngagement from "./ProductEngagement";
import ActiveAccounts from "./ActiveAccounts";
import ManagedRevenue from "./ManagedRevenue";
import HorizontalTab from "./HorizontalTab";
import StatCard from "../../Dashboard/StatCard";
import Customers from "./Customers";


const data = {
  managedRevenue: 24000000,
  annualRecurringRevenuePrev: 22.9,
  activeAccounts:127,
  activeAccountsPrev: 89,
  loginVsLastDays: 56,
  loginVsLastDaysPrev: 86,
  productEngagement: 91,
  productEngagementPrev: 74,
  featureEngagement: 70,
  featureEngagementPrev: 65
};

const Accounts = () => {
  const [activeTab, setActiveTab] = useState("Customers");

  const [selectedMode, setSelectedMode] = useState("period");
  const [timeBase, setTimeBase] = useState("monthly");

  const getActiveTabContent = () => {
    if (activeTab === "Customers") {
      return <Customers />;
    } else if (activeTab === "Feature Engagement") {
      return <FeatureEngagement viewMode={selectedMode}/>;
    } else if (activeTab === "Product Engagement") {
      return <ProductEngagement viewMode={selectedMode} timeBase={timeBase}/>
    } else if (activeTab === "Active Accounts") {
      return <ActiveAccounts viewMode={selectedMode}/>
    } else if (activeTab === "Managed Revenue") {
      return <ManagedRevenue viewMode={selectedMode}/>
    }
  };

  const getHorizontalTab = (sel_mod) => {

    let ret = [
      "Customers",
      "Managed Revenue",
      "Active Accounts",
      "Product Engagement",
      "Feature Engagement"
    ];

    if(sel_mod === 'period') {
      return ret;
    } else if(sel_mod === 'account') {
      let ret = [
        "Managed Revenue",
        "Product Engagement",
        "Feature Engagement"
      ];
      return ret;
    } else {
      return ret;
    }
  }

  return (
    <div className="dashboard customers">
      <Header
        title="Account Management"
        subTitle="Accounts"
        type={"accounts"}
        sethorizontaltab={setSelectedMode}
        setTimeBase={setTimeBase}
      />
      <HorizontalTab
        tabs={getHorizontalTab(selectedMode)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="annual-recurring-revenue">
        <div className="revenue-insights__statsGrid">
          <StatCard
            title="Managed Revenue"
            main={data.managedRevenue}
            reduceToMillion={true}
            bottom={data.annualRecurringRevenuePrev}
            grid={1}
            unit="dollar"
            page="accounts"
          />
          <StatCard
            title="# Accounts Activity"
            main={data.activeAccounts}
            bottom={data.activeAccountsPrev}
            grid={2}
            page="accounts"
            cardId="accounts-activity"
          />
          <StatCard
            title="Product Engagement"
            main={data.productEngagement}
            bottom={data.productEngagementPrev}
            unit="percentage"
            grid={3}
            page="accounts"
          />
          <StatCard
            title="Feature Engagement"
            main={data.featureEngagement}
            bottom={data.featureEngagementPrev}
            unit="percentage"
            grid={4}
            page="accounts"
          />
        </div>
        {getActiveTabContent()}
      </div>
    </div>
  );
};

export default Accounts;
