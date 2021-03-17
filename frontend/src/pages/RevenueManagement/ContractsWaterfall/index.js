import React, { useState, useEffect } from 'react';
import StatCard from "../../Dashboard/StatCard";
import { TableCell } from "@material-ui/core";
import { contract_dataTable, contract_dataTable_object } from 'utils/Utils';
import TableFreeze from '../../../components/TableFreeze/newTableFreeze';
import RevenueService from '../../../services/RevenueService'
import FullTableView from '../../../components/TableFreeze/FullTableView';
import loadingGif from '../../../assets/gif/loading.gif'
import { connect } from 'react-redux';
const moment = require('moment');

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
    name: 'Contract ID',
    label: 'CONTRACT ID',
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
    name: ' Annual Contract Value ',
    label: 'ANNUAL CONTRACT VALUE',
    options: {
      search: true,
      sort: true
    }
  },

  {
    name: 'Start Date',
    label: 'START DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'End Date',
    label: 'END DATE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Months',
    label: 'MONTHS',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Start Month',
    label: 'START MONTH',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Start Year',
    label: 'START YEAR',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: ' Monthly Value ',
    label: 'MONTHLY VALUE',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Segment ID',
    label: 'SEGEMENT ID',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Segment',
    label: 'SEGMENT',
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
    name: 'Jan 2019',
    label: 'JAN 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Feb 2019',
    label: 'FEB 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Mar 2019',
    label: 'MAR 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Apr 2019',
    label: 'APR 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'May 2019',
    label: 'MAY 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Jun 2019',
    label: 'JUN 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Jul 2019',
    label: 'JUL 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Aug 2019',
    label: 'AUG 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Sep 2019',
    label: 'SEP 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Oct 2019',
    label: 'OCT 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Nov 2019',
    label: 'NOV 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Dec 2019',
    label: 'DEC 2019',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Jan 2020',
    label: 'JAN 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Feb 2020',
    label: 'FEB 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Mar 2020',
    label: 'MAR 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Apr 2020',
    label: 'APR 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'May 2020',
    label: 'MAY 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Jun 2020',
    label: 'JUN 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Jul 2020',
    label: 'JUL 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Aug 2020',
    label: 'AUG 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Sep 2020',
    label: 'SEP 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Oct 2020',
    label: 'OCT 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Nov 2020',
    label: 'NOV 2020',
    options: {
      search: true,
      sort: true
    }
  },
  {
    name: 'Dec 2020',
    label: 'DEC 2020',
    options: {
      search: true,
      sort: true
    }
  },
];

const style = {
  position: "sticky",
  left: 0,
  background: "#c4c4c4",
  zIndex: 101
};

const ContractsWaterfall = (props) => {
  const [waterfallTableData, setWaterfallTableData] = useState([]);
  const noOfDatasInTable = 5;
  const [noOfPages, setNoOfPages] = useState(0);
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

  const [page, setPage] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [child_column, setChild_column] = useState(columns);

  const { full_table_view } = props;
  let contractStatusVal = '';
  contractStatusVal = localStorage.getItem('contractStatus');

  useEffect(() => {
    console.log("set freeze", props.set_waterfall_freeze);
    if (props.set_waterfall_freeze === true) {
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
      }
      setChild_column(col);
    }
    else {
      // console.log("affffasle", columns)
      setChild_column(columns);
    }
  }, [props.set_waterfall_freeze]);

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

  useEffect(() => {
    setPageLoading(true);

    RevenueService.getContractWaterfallData(page, noOfDatasInTable, props.set_revenue_waterfall_company)
      .then(res => {
        console.log(res.data.result);
        setNoOfPages(res.data.pages);
        var tabledata = [];
        res.data.result.map(data => {
          let array = [];
          array = Object.values(data);
          array.splice(0, 1);
          for (let i = 0; i < array.length; i++) {
            if (i === 4 || i === 5) {
              let date = array[i];
              if (date === null) {
                array[i] = '';
              } else {
                date = moment(date).format('MM/DD/YYYY');
                array[i] = date;
              }
            }
            if (i === 3 || i === 9 || i === 13 || i === 14 || i === 15 || i === 16 || i === 17 || i === 18 || i === 19 || i === 20 || i === 21 || i === 22 || i === 23 || i === 24 || i === 25 || i === 26 || i === 27 || i === 28 || i === 29 || i === 30 || i === 31 || i === 32 || i === 33 || i === 34 || i === 35 || i === 36) {
              if (array[i] === "") array[i] = " ";
              else {
                let temp = parseInt(array[i]).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                temp = "$" + temp;
                array[i] = temp;
              }
            }
          }

          tabledata.push(array);
        })
        setWaterfallTableData(tabledata);
        setPageLoading(false);

        // console.log(res.data);
      })
      .catch(err => {
        console.log('Error:', err);
      })
  }, [page, props.set_revenue_waterfall_company]);

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


  const dataInTable = contract_dataTable.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + 5
  );



  return (
    <div className="annual-recurring-revenue">
      {full_table_view ? <></> :
        <>
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
        </>
      }
      <div className="contracts-table">
        <div className="table-header position-absolute">
          <div className="table-name">Contracts Waterfall</div>
        </div>
        {pageLoading ? <div className="d-flex justify-content-center align-items-center"><img className="p-5 m-5" src={loadingGif} /></div> : <TableFreeze data={waterfallTableData} columns={child_column} tableType={2} />}
        <div style={{ display: "flex", alignItems: "center", marginTop: "18px" }}>
          <FullTableView />
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ dashboard_header: { set_revenue_waterfall_company }, table: { set_waterfall_freeze } }) => ({
  set_revenue_waterfall_company, set_waterfall_freeze
});

const mapDispatchToProps = ({ dashboard_header: { updateWaterfallState } }) => ({
  updateWaterfallState: (value) => updateWaterfallState(value)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractsWaterfall);
