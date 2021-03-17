import React, { useEffect, useState } from 'react';
import StatCard from '../../../components/StatCard';
import StatCardRow from '../../../components/StatCardRow';
import BarChart from '../../../components/BarChart/BarChartCustom';
import BarChartMultiple from '../../../components/BarChart/BarChartMultiple';
import TableView from '../../../components/TableView';
import InsightsHeader from '../InsightsHeader';
import {
  AM_product_engagement_chart,
  AM_growth_table,
  AM_growth_table_head,
  AM_growth_dataTableSpacing
} from '../../../utils/Utils';

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

const Summary = () => {
  const [tableView, setTableView] = useState(false);
  const [barChartView, setBarChartView] = useState(true);
  const [barChartViewMultiple, setBarChartViewMultiple] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartMultipleData, setChartMultipleData] = useState([]);

  const [viewOption, setViewOption] = useState('chartSingle');

  useEffect(() => {
    //const newChartData = AM_product_engagement_chart.map.
  }, []);

  return (
    <div className="annual-recurring-revenue">
      {/* <StatCardRow> */}
      <InsightsHeader />
      {/* </StatCardRow> */}
      <div>
        {viewOption === 'table' && (
          <TableView
            tableHeaders={AM_growth_table_head}
            tableData={AM_growth_table}
            tableSpacing={AM_growth_dataTableSpacing}
            tableTitle="Revenue Growth"
            handleChangeView={(arg) => setViewOption(arg)}
            tableClassName="table__economics table__growth"
          />
        )}
        {viewOption === 'chartSingle' && (
          <BarChart
            chartTitle="Revenue Growth"
            popoverDatePicker={true}
            handleChangeView={(arg) => setViewOption(arg)}
          />
        )}
        {viewOption === 'chartMultiple' && (
          <BarChartMultiple
            chartData={chartMultipleData}
            chartTitle="Revenue Growth"
            popoverDatePicker={true}
            handleChangeView={(arg) => setViewOption(arg)}
          />
        )}
      </div>
    </div>
  );
};

export default Summary;
