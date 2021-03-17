import React, { useState, useEffect } from "react";
import RevenueService from '../../../services/RevenueService';
import StatCard from "../../Dashboard/StatCard";
import BarChart from "./BarChart";
import TableFreeze from '../../../components/TableFreeze/newTableFreeze';
import { connect } from 'react-redux';
import moment from 'moment';

const columns = [
  {
    name: 'Company Name',
    label: 'Company Name',
    options: {
      search: true,
      sort: true,
    }
  },
  {
    name: 'Contract ID',
    label: 'Contract ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'End Date',
    label: 'End Date',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Days Until Renewal',
    label: 'Days Until Renewal',
    options: {
      search: true,
      sort: true
    }
  },
];

const ExpiringContracts = (props) => {

  const [tableView, setTableView] = useState(false);
  const [barChartView, setBarChartView] = useState(true);
  const [child_column, setChild_column] = useState(columns);
  const [contractTableData, setContractTableData] = useState([]);
  const noOfDatasInTable = 5;
  const [page, setPage] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);

  const handleTableView = () => {
    setTableView(!tableView);
    setBarChartView(false);
  };

  const handleChartView = () => {
    setBarChartView(!barChartView);
    setTableView(false);
  };

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
        // console.log(res.data);
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

    RevenueService.getExpiringTable(page, noOfDatasInTable, props.set_revenue_contract_company)
      .then(res => {
        // console.log('Expiring Contracts: ', res.data);
        var tabledata = [];
        setNoOfPages(res.data.pages);
        res.data.result.map(data => {
          let array = [];
          array = Object.values(data);
          array.slice(0, 1);
          for (let i = 0; i < array.length; i++) {
            if (i === 2) {
              let date = array[i];
              if (date === null) {
                array[i] = '';
              } else {
                date = moment(new Date(date)).utc().format("MM/DD/YYYY");
                array[i] = date;
              }
            }
          }
          tabledata.push(array);
        })
        // console.log('Expiring Contracts: ', tabledata);
        setContractTableData(tabledata);

      })
  }, [page, props.set_revenue_contract_company]);

  const pagination = () => {
    let tag = [];
    if (noOfPages < 5) {
      for (let i = 1; i <= noOfPages; i++) {
        tag.push(
          <li
            className={`pagination__page ${
              page === i - 1 ? `pagination__page--active` : null
              }`}
            onClick={() => {
              setPage(i - 1);
            }}
          >
            {i}
          </li>
        )
      }

    }
    else {
      if (page > 1) {
        tag.push(<li
          className={`pagination__page ${
            page === 0 ? `pagination__page--active` : null
            }`}
          onClick={() => {
            setPage(0);
          }}
        >
          1
      </li>)
        if (page > 2) tag.push(<li>...</li>)
      }
      if (page === 0) {
        for (let i = 0; i <= 2; i++) {
          tag.push(
            <li
              className={`pagination__page ${
                i === 0 ? `pagination__page--active` : null
                }`}
              onClick={() => {
                setPage(page + i);
              }}
            >
              {page + i + 1}
            </li>
          )
        }
      }
      else if (page === noOfPages - 1) {
        for (let i = 0; i <= 2; i++) {
          tag.push(
            <li
              className={`pagination__page ${
                i === 2 ? `pagination__page--active` : null
                }`}
              onClick={() => {
                setPage(page + i - 2);
              }}
            >
              {page + i - 1}
            </li>
          )
        }
      }
      else {
        for (let i = -1; i <= 1; i++) {
          tag.push(
            <li
              className={`pagination__page ${
                i === 0 ? `pagination__page--active` : null
                }`}
              onClick={() => {
                setPage(page + i);
              }}
            >
              {page + i + 1}
            </li>
          )
        }
      }
      if (page < noOfPages - 2) {
        if (page < noOfPages - 3) tag.push(<li>...</li>)
        tag.push(<li
          className={`pagination__page ${
            page === noOfPages - 1 ? `pagination__page--active` : null
            }`}
          onClick={() => {
            setPage(noOfPages - 1);
          }}
        >
          {noOfPages}
        </li>)
      }

    }

    return (tag);
  }

  // console.log("tableView", contractTableData)

  return (
    <div className="annual-recurring-revenue expiring-contracts">
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
      {tableView ? <TableFreeze
        columns={child_column}
        data={contractTableData}
        tableType={3}
        menuType="Exp"
        handleChartView={handleChartView}
        style={{ paddingLeft: '24px' }}
      /> : null}
      {barChartView ? <BarChart
        handleTableView={handleTableView}
      /> : null}
      {tableView ?
        <div className="pagination" style={{ flex: "auto" }}>
          <div
            className="pagination__prev"
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
              }
            }}
          >
            Previous
            </div>
          <div className="pagination__pages">
            <ul>
              {pagination()}
            </ul>
          </div>
          <div
            className="pagination__next"
            onClick={() => {
              if (page < noOfPages - 1) {
                setPage(page + 1);
              }
            }}
          >
            Next
            </div>
        </div>
        : null}
    </div>
  );
};

const mapStateToProps = ({ dashboard_header: { set_revenue_contract_company } }) => ({
  set_revenue_contract_company
});

// const mapDispatchToProps = ({ dashboard_header: { updateConnectionState, updateContractState } }) => ({
//   updateConnectionState: (value) => updateConnectionState(value),
//   updateContractState: (value) => updateContractState(value)
// });

export default connect(mapStateToProps)(ExpiringContracts);
