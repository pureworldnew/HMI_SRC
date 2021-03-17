import React, { useEffect, useState } from 'react';
import MuiTable from 'mui-datatables';
import CustomSearch from './CustomSearch';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Modal from '../../components/Modal';
import Popover from './Popover';
import CustomFooter from './CustomFooter';
import ChevronIcon from './ChevronIcon';

export default function TableFreeze({
  title,
  data,
  tableOptions,
  columns,
  ...props
}) {
  const [modalShow, setModalShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [showColumns, setShowColumns] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [activeColumns, setActiveColumns] = useState(null);
  const [freezeColumn, setFreezeColumn] = useState([]);

  // Set head cell class name
  const headClass = 'MuiPaper-root MuiTableCell-root MuiTableCell-head';

  // Create array for check
  useEffect(() => {
    setTableData(data);
  }, []);

  // Init table columns
  useEffect(() => {
    class ColumnsPrototype {
      constructor(name, label) {
        this.name = name;
        this.label = label;
      }
      options = {
        filter: true,
        sort: true,
        display: true,
        sortDirection: 'none',
        customHeadRender: (columnMeta) => {
          return (
            <th
              aria-controls="simple-popover-column-toolbar"
              aria-haspopup="true"
              aria-describedby={columnMeta.name}
              key={columnMeta.name}
              className={`${headClass} ${columnMeta.name}`}
              onClick={(e) => {
                onToggleColumn(columnMeta, e);
              }}>
              {columnMeta.label}
              <ChevronIcon
                type={columnMeta.sortDirection === 'asc' ? 'up' : null}
              />
            </th>
          );
        },
        setCellProps: () => {
          return {
            className: `MuiTableCell-root MuiTableCell-body ${this.name}`
          };
        }
      };
    }
    let newData = [];
    for (let i = 0; columns.length > i; i++) {
      let column = new ColumnsPrototype(columns[i].name, columns[i].label);
      newData = [...newData, column];
    }
    const showColumns = newData.map((key) => key.name);
    setShowColumns(showColumns);
    setColumnsData(newData);
  }, []);

  const options = {
    page: 0,
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
        <div className="panel-toolbar-more-menu">
          <IconButton onClick={() => setModalShow(true)}>
            <MoreHorizIcon />
          </IconButton>
        </div>
      );
    },
    customFooter: (
      count,
      page,
      rowsPerPage,
      changeRowsPerPage,
      changePage,
      textLabels
    ) => {
      return (
        <CustomFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
        />
      );
    },
    ...tableOptions
  };

  // Columns Show/Hide
  // Compare with init columns option
  const handleChange = (event) => {
    let newData = [];
    let newColumns = columnsData;
    if (event.target.checked) {
      newColumns.forEach((key) => {
        if (key.name === event.target.name) {
          key.options.display = true;
        }
      });
      newData = [...showColumns, event.target.name];
    } else {
      newColumns.forEach((key) => {
        if (key.name === event.target.name) {
          key.options.display = false;
        }
      });
      newData = showColumns.filter((key) => key !== event.target.name);
    }
    setShowColumns(newData);
    setColumnsData(newColumns);
  };

  // Update columns after change
  // in modal window
  const updateTableColumn = async () => {
    const newData = columnsData;
    await setColumnsData([]);
    await setColumnsData(newData);
    await setModalShow(false);
  };

  const onFilter = () => {
    setColumnsData([]);
    let newData = [];
    columnsData.forEach((key) => {
      if (key.name === activeColumns.name) {
        if (
          key.options.sortDirection === 'none' ||
          key.options.sortDirection === null
        ) {
          key.options.sortDirection = 'asc';
        } else if (key.options.sortDirection === 'asc') {
          key.options.sortDirection = 'desc';
        } else if (key.options.sortDirection === 'desc') {
          key.options.sortDirection = 'asc';
        }
      } else {
        key.options.sortDirection = null;
      }
      newData = [...newData, key];
    });
    setTooltip(null);
    setColumnsData(newData);
  };

  const onFreezeColumn = () => {
    let newData = [];

    if (freezeColumn.includes(activeColumns.index)) {
      newData = freezeColumn.filter((key) => key !== activeColumns.index);
      document
        .querySelectorAll(`.${activeColumns.name}`)
        .forEach((key) => key.classList.remove('sticky-column'));
    } else {
      document
        .querySelectorAll(`.${activeColumns.name}`)
        .forEach((key) => key.classList.add('sticky-column'));
      newData = [...freezeColumn, activeColumns.index];
    }
    setFreezeColumn(newData);
    setTooltip(null);
  };

  // hide column from popover in table header
  const onHideColumn = () => {
    let newData = [];
    let columnsCheckbox = [];

    // filter to hide current columns
    columnsData.map((key) => {
      if (key.name === activeColumns.name) {
        key.options.display = false;
      }
      newData = [...newData, key];
    });

    // filter columns for checkbox in modal
    newData.map((key) => {
      if (key.options.display) {
        columnsCheckbox = [...columnsCheckbox, key.name];
      }
    });
    setShowColumns(columnsCheckbox);
    setTooltip(null);
    setColumnsData([]);
    setColumnsData(newData);
  };
  // open popover in table header

  const onToggleColumn = (key, e) => {
    setTooltip(e.currentTarget);
    setActiveColumns(key);
  };

  // close popover in table header
  const onCloseTooltip = () => {
    setActiveColumns(null);
    setTooltip(null);
  };

  return (
    <div className="table-freeze">
      <MuiTable
        data={tableData}
        options={options}
        columns={columnsData}
        freezeColumn={freezeColumn}
      />
      <Popover
        anchorEl={tooltip}
        onClose={onCloseTooltip}
        popoverId="column-toolbar">
        <button onClick={() => onFilter()}>Order by this Column</button>
        <button onClick={() => onFreezeColumn()}>
          {activeColumns !== null && freezeColumn.includes(activeColumns.index)
            ? 'Unfreeze this Column'
            : 'Freeze this Column'}
        </button>
        <button onClick={() => onHideColumn()}>Hide this Column</button>
      </Popover>

      <Popover
        anchorEl={tooltip}
        onClose={onCloseTooltip}
        popoverId="table-toolbar">
        <h5>Export to</h5>
        <button>Excel (XLSX)</button>
        <button>Google Sheet</button>
        <hr />
        <button
          onClick={() => {
            setTooltip(null);
            setModalShow(true);
          }}>
          Show/Hide Columns
        </button>
      </Popover>
      <Modal
        modalShow={modalShow}
        onClose={() => setModalShow(false)}
        title="Show/Hide Columns"
        description="Please click on un-check boxes to hide wanted columns."
        content={
          <div style={{ margin: '32px 0 0' }}>
            <Grid container spacing={1}>
              {columnsData.map((key) => (
                <Grid key={key.name} item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="checkbox"
                        checked={showColumns.includes(key.name)}
                        onChange={handleChange}
                        name={key.name}
                        color="primary"
                      // checked = {checkedColumns[index] ? true: false}
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
              onClick={() => updateTableColumn()}
              className="button button--block-admin-bulk-next button-primary">
              Done
            </button>
          </>
        }
      />
    </div>
  );
}
