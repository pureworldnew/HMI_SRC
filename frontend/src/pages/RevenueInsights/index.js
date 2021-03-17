import React, { useState } from "react";
import { connect } from 'react-redux';
import Header from "../Dashboard/Header";
import AnnualRecurringRevenue from "./AnnualRecurringRevenue";
// import Customers from "./Customers";
import NetRevenueRetention from "./NetRevenueRetention";
import HorizontalTab from "./HorizontalTab";
import LogoRetentionRate from "./LogoRetentionRate";
import UnitEconomics from "./UnitEconomics";
import Summary from "./Summary";
import Growth from './Growth';

const RevenueInsights = (props) => {
  let { action, presentations } = props;
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });
  // const [activeTab, setActiveTab] = useState('Summary');
  const [activeTab, setActiveTab] = useState('Summary');
  let index = presentations.findIndex(p => p.id === 'fakeid1');
  if(index > -1){
      action(presentations[index].slides, 'data');
  }

  const getActiveTabContent = () => {
    if (activeTab === 'Summary') {
      return <Summary />;
    } else if (activeTab === 'Annual Recurring Revenue') {
      return <AnnualRecurringRevenue />;
    } else if (activeTab === 'Net Revenue Retention') {
      return <NetRevenueRetention />;
    } else if (activeTab === 'Logo Retention Rate') {
      return <LogoRetentionRate />;
    } else if (activeTab === "Growth") {
      return <Growth />;
    } else {
      return <UnitEconomics />;
    }
  };

  return (
    <div className="dashboard revenue-insights">
      <Header
        title="Revenue Management"
        subTitle="Revenue Insights"
        date={date}
        setDate={setDate}
        type="Revenue-Management"
        activetab={activeTab}
      />
      <HorizontalTab
        tabs={[
          'Summary',
          'Annual Recurring Revenue',
          // 'Customers',
          'Net Revenue Retention',
          'Logo Retention Rate',
          'Unit Economics',
          'Growth'
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {getActiveTabContent()}
    </div>
  );
};



function mapStateToProps(state) {
    let { presentations } = state;
    return {
        presentations: presentations.archived
    };
}

function mapDispatchToProps(dispatch) {
    let { slides } = dispatch;
    return {
        action: slides.updateState
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RevenueInsights);
