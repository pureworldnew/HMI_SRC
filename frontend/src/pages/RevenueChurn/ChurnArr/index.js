import React, { useEffect, useState } from 'react';
import TableView from '../../../components/TableView';
import BarChart from '../../../components/BarChart/BarChartCustom';
import ComposedChart from '../../../components/ComposedChart';

const tableHeaders = [
  '',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017',
  'Q1 2017'
];
const tableData = [
  [
    'Recurring Revenue',
    '$1,900,00',
    '$2,600,000',
    '$3,100,000',
    '$3,700,000',
    '$1,900,00',
    '$2,600,000',
    '$3,100,000',
    '$3,700,000',
    '$1,900,00',
    '$2,600,000',
    '$3,100,000',
    '$3,700,000'
  ],
  [
    'Churn',
    '$1,900,00',
    '$2,600,000',
    '$3,100,000',
    '$3,700,000',
    '$1,900,00',
    '$2,600,000',
    '$3,100,000',
    '$3,700,000',
    '$1,900,00',
    '$2,600,000',
    '$3,100,000',
    '$3,700,000'
  ],
  [
    'Churn as % of ARR',
    '2.37%',
    '2.88%',
    '2.92%',
    '18.2%',
    '17.8%',
    '2.92%',
    '2.37%',
    '2.88%',
    '2.92%',
    '18.2%',
    '17.8%',
    '2.92%'
  ]
];
export const tableSpacing =
  '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';

export default function ChurnArr({ ...props }) {
  const [viewOption, setViewOption] = useState('chartMultiple');
  const [chartData, setChartData] = useState([]);
  const [chartMultipleData, setChartMultipleData] = useState([]);

  const handleSearch = (e) => (value) => {
    console.log(value);
  };

  return (
    <div>
      {viewOption === 'table' && (
        <TableView
          tableHeaders={tableHeaders}
          tableData={tableData}
          tableSpacing={tableSpacing}
          tableTitle="Recurring Revenue, Churt and Churn as a % of ARR (2019)"
          handleChangeView={(arg) => setViewOption(arg)}
          tableClassName="table__economics table__growth churn"
          toolbarType="search"
          handleSearch={handleSearch}
        />
      )}
      {viewOption === 'chartSingle' && (
        <BarChart
          chartTitle="Logo Retention Rate (LRR) (2019)"
          handleChangeView={(arg) => setViewOption(arg)}
          popoverDatePicker={true}
        />
      )}
      {viewOption === 'chartMultiple' && (
        <ComposedChart
          chartData={chartMultipleData}
          chartTitle="Recurring Revenue, Churt and Churn as a % of ARR (2019)"
          handleChangeView={(arg) => setViewOption(arg)}
          labelLegend={['Recurring Revenue', 'Churn', 'Churn as % of ARR']}
        />
      )}
    </div>
  );
}
