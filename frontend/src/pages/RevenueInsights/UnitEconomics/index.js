import React from "react";
import StatCard from "../../Dashboard/StatCard";
import TableFreeze from '../../../components/TableFreeze';
import {
  Unit_economics_data,
  AM_period_dataTable_header
}
  from "../../../utils/Utils";
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

const UnitEconomics = () => {

  return (
    <div className="net-revenue-retention">
      <InsightsHeader />
      <div className="contracts-table">
        <div className="table-header position-absolute">
          <div className="table-name">Unit Economics (2019)</div>
        </div>
        <TableFreeze
          columns={AM_period_dataTable_header}
          data={Unit_economics_data}
        />
      </div>
    </div>
  );
};

export default UnitEconomics;
