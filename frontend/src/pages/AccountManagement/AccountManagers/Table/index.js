import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import tableStyles from './TableStyles';
import tableColumn from './TableColumn';
import tableOptions from './TableOptions';

const ManagersTable = ({ accounts, managers, ...props }) => {
  let [tableData, setTableData] = useState(accounts);
  let theme = tableStyles();
  let columns = tableColumn({ managers, accounts });
  let options = tableOptions({ data: accounts });

  useEffect(() => {
    setTableData(accounts);
  }, [accounts]);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          data={tableData || []}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </>
  );
};

export default ManagersTable;
