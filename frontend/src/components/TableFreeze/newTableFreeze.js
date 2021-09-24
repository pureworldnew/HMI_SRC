import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import MuiTable from 'mui-datatables';
import CustomSearch from './CustomSearch';
import Modal from '../../components/Modal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
  Grid,
  IconButton,
  Switch,
  Divider,
  FormControlLabel,
  Checkbox,
  TableRow,
  TableCell,
  Button
} from '@material-ui/core';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import './customstyles/newTableFreeze.scss';
import useScrollPosition from '../../utils/useScrollPosition';

import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

function TableFreeze({
  data,
  columns,
  tableOptions,
  tableType,
  menuType,
  showMoreRows,
  ...props
}) {
  const { full_table_view } = useSelector((state) => state.table);
  let containerRef = useRef();
  // console.log('menuType: ', menuType);
  const [modalShow, setModalShow] = useState(false);
  const [columnsData, setColumnsData] = useState([]);
  const [tableData, settableData] = useState(data);
  const [showColumns, setShowColumns] = useState([]);
  const [checkedColumns, setcheckedColumns] = useState([]);
  const [checkStatus, setcheckStatus] = useState(false);
  const [checkAllStatus, setCheckAllStatus] = useState(true);
  const [switch1, setswitch1] = useState(false);

  // const [newColumns, setNewColumns]
  // console.log('table data:111 ', tableData, data);

  const options = {
    rowsSelected: false,
    responsive: 'scroll',
    print: false,
    download: false,
    sortFilterList: false,
    selectableRows: 'none',
    searchOpen: true,
    search: true,
    filter: false,
    viewColumns: false,
    pagination: false,
    // expandableRows: true,
    // expandableRowsOnClick: true,
    // isRowExpandable: (dataIndex, expandedRows) => {
    //     // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
    //     // if (expandedRows.data.length === 58) return false;
    //     // return true;
    //     console.log("dadd", expandedRows)
    //     return true;
    // },
    // rowsExpanded: [],
    // renderExpandableRow: (rowData, rowMeta) => {
    //     const colSpan = rowData.length + 1;
    //     let a = rowData;
    //     let arrays = [], size = 58;

    //     while (a.length > 0)
    //         arrays.push(a.splice(0, size));

    //     console.log("adfe", arrays);
    //     return (
    //         <div>
    //             <TableRow>
    //                 <TableCell colSpan={colSpan}>
    //                     Custom expandable row option. Data: {JSON.stringify(rowData)}
    //                 </TableCell>
    //             </TableRow>
    //             <TableRow>
    //                 <TableCell colSpan={colSpan}>
    //                     Custom expandable row option. Data: {JSON.stringify(rowData)}
    //                 </TableCell>
    //             </TableRow>
    //         </div>

    //     );
    // },
    // onRowsExpand: (curExpanded, allExpanded) => console.log(curExpanded, allExpanded),
    customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      return (
        <CustomSearch
          searchText={searchText}
          onSearch={handleSearch}
          onHide={hideSearch}
          options={options}
        />
      );
    },
    customToolbar: () => {
      return (
        // onClick={() => setModalShow(true)}
        <div className="panel-toolbar-more-menu">
          {/* <IconButton id={menuType === "Exp" ? "ExpPopover" : "tablePopover"}> */}
          <IconButton id="tablePopover">
            <MoreHorizIcon />
          </IconButton>
        </div>
      );
    },
    ...tableOptions
  };

  useEffect(() => {
    // console.log('I am here');
    if (tableType === 3) {
      // setColumnsData(columns);
      console.log(data);
      setShowColumns(columns);
      settableData(data);
    } else {
      setColumnsData(columns);
      if (JSON.parse(localStorage.getItem('checkedColumnData'))) {
        if (JSON.parse(localStorage.getItem('checkedColumnData'))[tableType]) {
          console.log(typeof tableType);
          var checkedcolumn = JSON.parse(
            localStorage.getItem('checkedColumnData')
          )[tableType];
          setcheckedColumns(checkedcolumn);
          console.log(checkedcolumn[0]);
          let newColumn = [];
          for (var i = 0; i < columns.length; i++) {
            if (checkedcolumn[i] === true) {
              newColumn.push(columns[i]);
            }
          }
          setShowColumns(newColumn);
          let newData1 = [];
          for (var j = 0; j < data.length; j++) {
            let newData2 = [];
            for (var k = 0; k < data[j].length; k++) {
              if (checkedcolumn[k] === true) {
                newData2.push(data[j][k]);
              }
            }
            newData1.push(newData2);
          }
          console.log('table data console', newData1);
          settableData(newData1);
        } else {
          const newData = columns.map((key) => key);
          setShowColumns(newData);

          const array = columns.reduce((accu, cur, index) => {
            accu[index + ''] = true;
            return accu;
          }, {});

          setcheckedColumns(array);
        }
      } else {
        const newData = columns.map((key) => key);
        setShowColumns(newData);

        const array = columns.reduce((accu, cur, index) => {
          accu[index + ''] = true;
          return accu;
        }, {});

        setcheckedColumns(array);
      }

      if (tableType === 1) setswitch1(props.set_contract_freeze);
      else if (tableType === 2) setswitch1(props.set_waterfall_freeze);
    }
  }, [props.set_waterfall_freeze, props.set_contract_freeze, data]);

  const handleChange = (event, index) => {
    setcheckedColumns({
      ...checkedColumns,
      [index]: event.target.checked
    });
  };

  const handleSwitch = (event) => {
    setswitch1(event.target.checked);
    if (tableType === 1) props.updateContractFreezeState(event.target.checked);
    if (tableType === 2) props.updateWaterfallFreezeState(event.target.checked);
  };

  const checkColumn = () => {
    let newColumn = [];
    for (var i = 0; i < columns.length; i++) {
      if (checkedColumns[i] === true) {
        newColumn.push(columns[i]);
      }
    }
    setShowColumns(newColumn);

    let newData1 = [];
    for (var j = 0; j < data.length; j++) {
      let newData2 = [];
      for (var k = 0; k < data[j].length; k++) {
        if (checkedColumns[k] === true) {
          newData2.push(data[j][k]);
        }
      }
      newData1.push(newData2);
    }
    settableData(newData1);

    setModalShow(false);
    setcheckStatus(true);
    var checkedColumnData = [];
    if (localStorage.getItem('checkedColumnData'))
      checkedColumnData = JSON.parse(localStorage.getItem('checkedColumnData'));
    checkedColumnData[tableType] = checkedColumns;

    var stringify_data = JSON.stringify(checkedColumnData);
    localStorage.setItem('checkedColumnData', stringify_data);
  };

  const handleAllChange = (e) => {
    console.log(e.target.checked);
    setCheckAllStatus(e.target.checked);
    let status = false;
    if (e.target.checked) status = true;
    const array = columns.reduce((accu, cur, index) => {
      accu[index + ''] = status;
      return accu;
    }, {});
    setcheckedColumns(array);
  };

  const handleChartView = () => {
    // handleClose();
    props.handleChartView();
  };
  // const element = document.querySelectorAll(
  //   '.full-table-view [class*=MUIDataTable-responsiveScroll-]'
  // )[0];
  // const scroll = useScrollPosition(element);
  // console.log(scroll);
  return (
    <div className={`table-freeze ${full_table_view && 'full-table-view'}`}>
      <MuiTable data={tableData} options={options} columns={showColumns} />
      {full_table_view && (
        <button
          className="button button--block icon-between button--sm button-show-more show"
          style={{ margin: '5px auto' }}
          onClick={() => showMoreRows()}>
          Show more
          <AddIcon style={{ marginLeft: '2.5rem' }} />
        </button>
      )}
      <Modal
        modalShow={modalShow}
        onClose={() => setModalShow(false)}
        title="Show/Hide Columns"
        description="Please click on un-check boxes to hide wanted columns."
        content={
          <div style={{ margin: '32px 0 0' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className="checkbox"
                      onChange={(event) => handleAllChange(event)}
                      name="All"
                      color="primary"
                      checked={checkAllStatus}
                    />
                  }
                  label="All"
                />
              </Grid>
              {columnsData.map((key, index) => (
                <Grid key={key} item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="checkbox"
                        onChange={(event) => handleChange(event, index)}
                        name={key.name}
                        color="primary"
                        checked={!!checkedColumns[index]}
                      />
                    }
                    label={key.label}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        }
        footer={
          <>
            <span />
            <button
              className="button button--block-admin-bulk-next button-primary"
              onClick={checkColumn}>
              Done
            </button>
          </>
        }
      />
      {menuType === 'Exp' ? (
        <UncontrolledPopover
          trigger="legacy"
          placement="left"
          target="tablePopover">
          <PopoverBody>
            <List
              component="nav"
              className="context-menu"
              aria-label="secondary mailbox folders">
              <MenuItem>
                <ListItemText primary="Export To" />
              </MenuItem>
              <MenuItem>
                {/* elementToConvert={containerRef}
                                imageName="Expiring Contracts" */}
                <ListItemText primary="JPG" />
              </MenuItem>
              <MenuItem>
                <ListItemText primary="PNG" />
              </MenuItem>
              <MenuItem>
                <ListItemText primary="XLSX" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleChartView}>
                <ListItemText primary="Chart View" />
              </MenuItem>
            </List>
          </PopoverBody>
        </UncontrolledPopover>
      ) : (
        <UncontrolledPopover
          trigger="legacy"
          placement="left"
          target="tablePopover">
          <PopoverBody>
            <div className="popover-btn-wrapper">
              <div className="first">
                <button>Export to</button>
              </div>
              <div className="first">
                <button>Excel (XLSX)</button>
              </div>
              <div className="first">
                <button>Google Sheet</button>
              </div>
            </div>
            <Divider />
            <div className="popover-btn-wrapper">
              <div className="second">
                <label>Freeze 1st column</label>
              </div>
            </div>
            <Switch
              checked={switch1}
              onChange={handleSwitch}
              color="primary"
              name="switch1"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
            <Divider />
            <div className="popover-btn-wrapper">
              <div className="first">
                <button onClick={() => setModalShow(true)}>
                  Show/Hide Columns
                </button>
              </div>
            </div>
          </PopoverBody>
        </UncontrolledPopover>
      )}
    </div>
  );
}

const mapStateToProps = ({
  table: { set_contract_freeze, set_waterfall_freeze }
}) => ({
  set_contract_freeze,
  set_waterfall_freeze
});

const mapDispatchToProps = ({
  table: { updateContractFreezeState, updateWaterfallFreezeState }
}) => ({
  updateContractFreezeState: (value) => updateContractFreezeState(value),
  updateWaterfallFreezeState: (value) => updateWaterfallFreezeState(value)
});

export default connect(mapStateToProps, mapDispatchToProps)(TableFreeze);
