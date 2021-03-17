import React, { useState, useEffect } from 'react';
import StatCard from '../../Dashboard/StatCard';
import { TableCell } from '@material-ui/core';
import { dataTable } from 'utils/Utils';
import TableFreeze from '../../../components/TableFreeze/newTableFreeze';
import FullTableView from '../../../components/TableFreeze/FullTableView';
import RevenueService from '../../../services/RevenueService';
import loadingGif from '../../../assets/gif/loading.gif';
import { connect } from 'react-redux';
import { Cpu } from 'react-feather';
import moment from 'moment';

const columns = [
  {
    name: 'Company',
    label: 'COMPANY',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Events Company Name',
    label: 'EVENTS COMPANY NAME',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Company ID',
    label: 'COMPANY ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Company Name',
    label: 'CONTRACT COMPANY NAME',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Address',
    label: 'CONTRACT ADDRESS',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract ID',
    label: 'CONTRACT ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Active',
    label: 'ACTIVE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Date',
    label: 'CONTRACT DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Type',
    label: 'CONTRACT TYPE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Their Executor',
    label: 'THEIR EXECUTOR',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Their Executor Title',
    label: 'THEIR EXECUTOR TITLE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Our Executor',
    label: 'OUR EXECUTOR',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Go-Live Date',
    label: 'GO-LIVE DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Start Date',
    label: 'CONTRACT START DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract End Date',
    label: 'CONTRACT END DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract End/Termination Date',
    label: 'CONTRACT END/TERMINATION DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Months',
    label: 'CONTRACT MONTHS',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Days Until Renewal',
    label: 'DAYS UNTIL RENEWAL',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Billing Start Date',
    label: 'BILLING START DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Billing Frequency',
    label: 'BILLING FREQUENCY',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Term',
    label: 'CONTRACT TERM',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Term Metric',
    label: 'TERM METRIC',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Annual Contract Value',
    label: 'Annual Contract Value',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Total Contract Value',
    label: 'Total Contract Value',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Current ARR',
    label: 'CURRENT ARR',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Segment ID',
    label: 'SEGMENT ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Segment Name',
    label: 'SEGMENT NAME',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Products Purchased',
    label: 'PRODUCTS PURCHASED',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Product #',
    label: 'PRODUCT #',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Discounts',
    label: 'DISCUOUNTS',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Termination Rights',
    label: 'TERMINATION RIGHTS',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Notice to Terminate',
    label: 'NOTICE TO TERMINATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Notice to Terminte Units',
    label: 'NOTICE TO TERMINATE UNITS',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Account Executive ID',
    label: 'ACCOUNT EXECUTIVE ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Account Executive',
    label: 'ACCOUNT EXECUTIVE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Account Manager ID',
    label: 'ACCOUNT MANAGER ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Account Manager',
    label: 'ACCOUNT MANAGER',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Termination Date',
    label: 'TERMINATION DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Termination Reason ID',
    label: 'TERMINATION REASON ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Termination Reason',
    label: 'TERMINATION REASON',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Termination Notes',
    label: 'TERMINATION NOTES',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Plan Name',
    label: 'PLAN NAME',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Plan Name 2',
    label: 'PLAN NAME 2',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Auto Renew',
    label: 'AUTO RENEW',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Invoicing',
    label: 'INVOICING',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Invoice Amount',
    label: 'INVOICE AMOUNT',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Price Per User',
    label: 'PRICE PER USER',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Licenses Purchased',
    label: 'LICENSES PURCHASED',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract External URL',
    label: 'CONTRACT EXTERNAL URL',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Contract Internal URL',
    label: 'CONTRACT INTERNAL URL',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Delivery',
    label: 'DELIVERY',
    options: {
      search: true,
      sort: true
    }
  }
];

const style = {
  position: 'sticky',
  left: 0,
  background: '#c4c4c4',
  zIndex: 101
};

const Overview = (props) => {
  const { full_table_view } = props;
  const [contractTableData, setContractTableData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  let noOfDatasInTable = 5;
  const [pageLoading, setPageLoading] = useState(true);
  const [cardData, setCardData] = useState({
    activecontracts: 0,
    activecontracts_bottom: 0,
    annual_contract_value: 0,
    annual_contract_value_bottom: "Small: 0 | Mid: 0 | Ent: 0",
    revenue_loss_exposure_this_month: 0,
    revenue_loss_exposure_this_month_bottom: 0,
    expiring_this_month: 0,
    expiring_this_month_bottom: 0
  });
  const [page, setPage] = useState(0);
  const [child_column, setChild_column] = useState(columns);
  let contractStatusVal = '';
  contractStatusVal = localStorage.getItem('contractStatus');

  useEffect(() => {
    // console.log("set freeze", props.set_freeze);
    if (props.set_contract_freeze === true) {
      let col = JSON.stringify(columns);
      col = JSON.parse(col);
      col[0] = {
        name: 'Company',
        label: 'COMPANY',
        options: {
          search: true,
          sort: true,
          customHeadRender: () => (
            <TableCell key="name" style={{ ...style, top: 0, zIndex: 102 }}>
              COMPANY
            </TableCell>
          ),
          setCellProps: () => ({ style })
        }
      };
      setChild_column(col);
    } else {
      setChild_column(columns);
    }
  }, [props.set_contract_freeze]);

  useEffect(() => {
    RevenueService.getContractCard().then((res) => {
      var data = {
        activecontracts: res.data.activeContractCnt[0].activeContractCnt,
        activecontracts_bottom: res.data.lastMonth[0].lastMonth,
        annual_contract_value:
          contractStatusVal === 'ACV'
            ? res.data.avgContractVal[0].avgContractVal
            : res.data.totalContractVal[0].avgContractVal,
        annual_contract_value_bottom: `Small: $${res.data.small} | Mid: $${res.data.mid} | Ent: $${res.data.ent}`,
        revenue_loss_exposure_this_month: res.data.revLossExp[0].revLossExp,
        revenue_loss_exposure_this_month_bottom:
          res.data.nextRevLossExp[0].nextRevLossExp,
        expiring_this_month: res.data.expContract[0].expContract,
        expiring_this_month_bottom: res.data.nextExpContract[0].nextExpContract
      };
      setCardData(data);
    });
  }, []);

  useEffect(() => {
    noOfDatasInTable = full_table_view ? 15 : 5;
    setPageLoading(true);
    RevenueService.getContractTable(
      page,
      noOfDatasInTable,
      props.set_revenue_contract_company
    )
      .then((res) => {
        // console.log("date bug fixx working...................", res.data)
        setNoOfPages(res.data.pages);
        var tabledata = [];
        res.data.result.map((data) => {
          let array = [];
          // console.log("I am here");
          array = Object.values(data);
          array.splice(0, 1);
          for (let i = 0; i < array.length; i++) {
            if (
              i === 7 ||
              i === 12 ||
              i === 13 ||
              i === 14 ||
              i === 15 ||
              i === 37
            ) {
              let date = array[i];
              if (date === null) {
                array[i] = '';
              } else {
                date = moment(new Date(date)).utc().format('MM/DD/YYYY');
                array[i] = date;
              }
            }
            if (i === 22 || i === 23 || i === 24) {
              if (array[i] === '' || array[i] === null) array[i] = ' ';
              else {
                let temp = parseInt(array[i])
                  .toFixed(0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                temp = '$' + temp;
                array[i] = temp;
              }
            }
          }
          tabledata.push(array);
        });
        // console.log('Contract table: ', tabledata);
        setContractTableData(tabledata);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [page, props.set_revenue_contract_company, full_table_view]);

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
            }}>
            {i}
          </li>
        );
      }
    } else {
      if (page > 1) {
        tag.push(
          <li
            className={`pagination__page ${
              page === 0 ? `pagination__page--active` : null
              }`}
            onClick={() => {
              setPage(0);
            }}>
            1
          </li>
        );
        if (page > 2) tag.push(<li>...</li>);
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
              }}>
              {page + i + 1}
            </li>
          );
        }
      } else if (page === noOfPages - 1) {
        for (let i = 0; i <= 2; i++) {
          tag.push(
            <li
              className={`pagination__page ${
                i === 2 ? `pagination__page--active` : null
                }`}
              onClick={() => {
                setPage(page + i - 2);
              }}>
              {page + i - 1}
            </li>
          );
        }
      } else {
        for (let i = -1; i <= 1; i++) {
          tag.push(
            <li
              className={`pagination__page ${
                i === 0 ? `pagination__page--active` : null
                }`}
              onClick={() => {
                setPage(page + i);
              }}>
              {page + i + 1}
            </li>
          );
        }
      }
      if (page < noOfPages - 2) {
        if (page < noOfPages - 3) tag.push(<li>...</li>);
        tag.push(
          <li
            className={`pagination__page ${
              page === noOfPages - 1 ? `pagination__page--active` : null
              }`}
            onClick={() => {
              setPage(noOfPages - 1);
            }}>
            {noOfPages}
          </li>
        );
      }
    }

    return tag;
  };

  const showMoreRows = () => {
    console.log('show more rows');
  };

  return (
    <div className="annual-recurring-revenue">
      {full_table_view ? (
        <></>
      ) : (
          <>
            <div className="revenue-insights__statsGrid">
              <StatCard
                page="revenue-management"
                title="Companies with Active Contracts"
                main={parseInt(cardData.activecontracts)
                  .toFixed(0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                bottom={`Last month: ` + parseInt(cardData.activecontracts_bottom).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                grid={1}
              />
              <StatCard
                page="revenue-management"
                title={
                  contractStatusVal === 'ACV'
                    ? 'Annual Contract Value'
                    : 'Total Contract Value'
                }
                main={cardData.annual_contract_value}
                bottom={cardData.annual_contract_value_bottom}
                bottom_dollar="false"
                unit="dollar"
                grid={2}
              />
              <StatCard
                page="revenue-management"
                title={
                  contractStatusVal === 'ACV'
                    ? 'Revenue Loss Exposure this month(ACV)'
                    : 'Revenue Loss Exposure this month(TCV)'
                }
                main={cardData.revenue_loss_exposure_this_month}
                bottom={
                  `Next month: $` +
                  parseInt(cardData.revenue_loss_exposure_this_month_bottom)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                unit="dollar"
                grid={3}
              />
              <StatCard
                page="revenue-management"
                title="Contracts Expiring This Month"
                main={parseInt(cardData.expiring_this_month)
                  .toFixed(0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                bottom={
                  `Next Month: ` +
                  parseInt(cardData.expiring_this_month_bottom)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                bottom={
                  `Next Month: ` +
                  parseInt(cardData.expiring_this_month_bottom)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                grid={4}
              />
            </div>
          </>
        )}
      <div className="contracts-table">
        <div className="table-header position-absolute">
          <div className="table-name">Contracts</div>
        </div>
        {pageLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <img className="p-5 m-5" src={loadingGif} alt="spinner" />
          </div>
        ) : (
            <TableFreeze
              columns={child_column}
              data={contractTableData}
              tableType={1}
              showMoreRows={showMoreRows}
            />
          )}
        {/* <TableFreeze
          columns={columns}
          // spacing="1fr 1fr 1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr"
          data={contractTableData}
        /> */}
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '18px' }}>
          <FullTableView />
          {!full_table_view && (
            <div className="pagination" style={{ flex: 'auto' }}>
              <div
                className="pagination__prev"
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                  }
                }}>
                Previous
              </div>
              <div className="pagination__pages">
                <ul>{pagination()}</ul>
              </div>
              <div
                className="pagination__next"
                onClick={() => {
                  if (page < noOfPages - 1) {
                    setPage(page + 1);
                  }
                }}>
                Next
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  dashboard_header: { set_connection_company, set_revenue_contract_company },
  table: { set_contract_freeze }
}) => ({
  set_connection_company,
  set_revenue_contract_company,
  set_contract_freeze
});

const mapDispatchToProps = ({
  dashboard_header: { updateConnectionState, updateContractState }
}) => ({
  updateConnectionState: (value) => updateConnectionState(value),
  updateContractState: (value) => updateContractState(value)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
