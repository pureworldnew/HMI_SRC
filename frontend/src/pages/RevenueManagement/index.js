import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Dashboard/Header';
import Overview from './Overview';
import ContractsWaterfall from './ContractsWaterfall';
import AnnualContractValue from './AnnualContractValue';
import RevenueLossExposure from './RevenueLossExposure';
import HorizontalTab from './HorizontalTab';
import ExpiringContracts from './ExpiringContracts';

const RevenueManagement = (props) => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });

  const [activeTab, setActiveTab] = useState('Contracts');
  let contractStatusVal = '';
  contractStatusVal = localStorage.getItem('contractStatus');

  const { full_table_view } = props;

  const getActiveTabContent = () => {
    if (activeTab === 'Contracts') {
      return <Overview full_table_view={full_table_view} />;
    } else if (activeTab === 'Contracts Waterfall') {
      return <ContractsWaterfall full_table_view={full_table_view} />;
    // } else if (activeTab === 'Annual Contract Value (ACV)') {
    //   return <AnnualContractValue />;
    // } else if (activeTab === 'Annual Contract Value (TCV)') {
    //   return <AnnualContractValue />;
    // } else if (activeTab === 'Revenue Loss Exposure (ACV)') {
    //   return <RevenueLossExposure />;
    } else if (activeTab === 'Revenue Loss Exposure ($)') {
      return <RevenueLossExposure />;
    } else {
      return <ExpiringContracts />;
    }
  };

  const getActiveTabHeader = () => {
    if (activeTab === 'Contracts') {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
          activetab="Contracts"
        />
      );
    } else if (activeTab === 'Contracts Waterfall') {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
          activetab="Contracts Waterfall"
        />
      );
    } else if (activeTab === 'Annual Contract Value (ACV)') {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
          activetab="Contract Management"
        />
      );
    } else if (activeTab === 'Annual Contract Value (TCV)') {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
          activetab="Contract Management"
        />
      );
    } else if (activeTab === 'Revenue Loss Exposure (ACV)') {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
          activetab="revenue_loss_exposure"
        />
      );
    } else if (activeTab === 'Revenue Loss Exposure (TCV)') {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
          activetab="revenue_loss_exposure"
        />
      );
    } else {
      return (
        <Header
          title="Revenue Management"
          subTitle="Contract Management"
          date={date}
          setDate={setDate}
          type="Revenue-Management"
        />
      );
    }
  };
  return (
    <div className="dashboard revenue-insights">
      {full_table_view ? (
        <></>
      ) : (
        <div>
          {getActiveTabHeader()}
          <HorizontalTab
            tabs={[
              'Contracts',
              'Contracts Waterfall',
          //    'Annual Contract Value (ACV)',
              'Revenue Loss Exposure ($)',
              'Expiring Contracts'
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
      {getActiveTabContent()}
    </div>
  );
};

const mapStateToProps = ({ table: { full_table_view } }) => ({
  full_table_view
});

export default connect(mapStateToProps, null)(RevenueManagement);
// export default RevenueManagement;
