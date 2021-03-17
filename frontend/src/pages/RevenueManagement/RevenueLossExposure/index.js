import React, { useState, useEffect } from "react";
import RevenueService from '../../../services/RevenueService'
import StatCard from "../../Dashboard/StatCard";
import BarChart from "./BarChart";

const RevenueLossExposure = (props) => {

  const [cardData, setCardData] = useState(
    {
      activecontracts: 0,
      activecontracts_bottom: 0,
      annual_contract_value: 0,
      annual_contract_value_bottom: "Small: 0 | Mid: 0 | Ent: 0",
      revenue_loss_exposure_this_month: 0,
      revenue_loss_exposure_this_month_bottom: 0,
      expiring_this_month: 0,
      expiring_this_month_bottom: 0
    }
  );

  let contractStatusVal = '';
  contractStatusVal = localStorage.getItem('contractStatus');

  useEffect(() => {
    RevenueService.getContractCard()
      .then(res => {
        var data = {
          activecontracts: res.data.activeContractCnt[0].activeContractCnt,
          activecontracts_bottom: res.data.lastMonth[0].lastMonth,
          annual_contract_value: contractStatusVal === 'ACV' ? res.data.avgContractVal[0].avgContractVal : res.data.totalContractVal[0].avgContractVal,
          annual_contract_value_bottom: `Small: $${res.data.small} | Mid: $${res.data.mid} | Ent: $${res.data.ent}`,
          revenue_loss_exposure_this_month: res.data.revLossExp[0].revLossExp,
          revenue_loss_exposure_this_month_bottom: res.data.nextRevLossExp[0].nextRevLossExp,
          expiring_this_month: res.data.expContract[0].expContract,
          expiring_this_month_bottom: res.data.nextExpContract[0].nextExpContract
        }
        setCardData(data);
      })
  }, []);

  return (
    <div className="annual-recurring-revenue">
      <div className="revenue-insights__statsGrid">
        <StatCard
          page="revenue-management"
          title="Companies with Active Contracts"
          main={parseInt(cardData.activecontracts).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          bottom={`Last month: ` + parseInt(cardData.activecontracts_bottom).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          grid={1}
        />
        <StatCard
          page="revenue-management"
          title={contractStatusVal === 'ACV' ? "Annual Contract Value" : "Total Contract Value"}
          main={cardData.annual_contract_value}
          bottom={cardData.annual_contract_value_bottom}
          bottom_dollar="false"
          unit="dollar"
          grid={2}
        />
        <StatCard
          page="revenue-management"
          title={contractStatusVal === 'ACV' ? "Revenue Loss Exposure this month(ACV)" : "Revenue Loss Exposure this month(TCV)"}
          main={cardData.revenue_loss_exposure_this_month}
          bottom={`Next month: $` + parseInt(cardData.revenue_loss_exposure_this_month_bottom).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          unit="dollar"
          grid={3}
        />
        <StatCard
          page="revenue-management"
          title="Contracts Expiring This Month"
          main={parseInt(cardData.expiring_this_month).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          bottom={`Next Month: ` + parseInt(cardData.expiring_this_month_bottom).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          grid={4}
        />
      </div>
      <BarChart />
    </div>
  );
};

export default RevenueLossExposure;
