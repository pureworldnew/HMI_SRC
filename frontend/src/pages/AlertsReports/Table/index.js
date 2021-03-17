import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import TablePagination from '../../../components/TablePagination';
import Popover from '../Popover';
import ButtonDotsMore from '../../../components/ButtonDotsMore';
import DatePickerPopover from '../../../components/DatePickerPopover';
import AvatarImg from '../../../assets/img/gabeLewisExampleIcon.jpg';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const TableList = ({ setActiveRow, data, columns, showModal, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classNameTd = 'MuiTableCell-root MuiTableCell-body';
  const options = {
    page: 0,
    rowsSelected: false,
    responsive: 'scroll',
    print: false,
    download: false,
    sortFilterList: false,
    selectableRows: 'none',
    searchOpen: false,
    search: false,
    filter: false,
    viewColumns: false,
    pagination: false,
    elevation: 0,
    rowHover: false,
    customRowRender: (data, dataIndex, rowIndex) => {
      return (
        <tr key={rowIndex} className="MuiTableRow-root">
          {data.map((key, index) => {
            if (index === 0) {
              return null;
            }
            if (index === 2) {
              return (
                <td key={rowIndex + key} className={classNameTd}>
                  <AvatarGroup max={3}>
                    {JSON.parse(data[2]).map((key) => (
                      <Avatar key={key} alt="Remy Sharp" src={AvatarImg} />
                    ))}
                  </AvatarGroup>
                </td>
              );
            }
            if (index === 3) {
              return (
                <td key={rowIndex + key} className={classNameTd}>
                  <span
                    className={key ? 'status-circle' : 'status-circle passive'}
                  />
                  {key ? 'Active' : 'Non active'}
                </td>
              );
            }
            return (
              <td key={rowIndex + key} className={classNameTd}>
                {key}
                {index === 4 && (
                  <ButtonDotsMore
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget);
                      setActiveRow(data[0]);
                    }}
                    popoverId={rowIndex}
                  />
                )}
              </td>
            );
          })}
        </tr>
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
        <TablePagination
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
        />
      );
    }
  };

  return (
    <>
      <MUIDataTable
        className="table-list"
        options={options}
        columns={columns}
        data={data || []}
      />
      <Popover
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
        onView={() => {
          showModal('view');
          setAnchorEl(null);
        }}
        onPause={() => {
          showModal('pause');
          setAnchorEl(null);
        }}
        onDelete={() => {
          showModal('delete');
          setAnchorEl(null);
        }}
        onEdit={() => {
          showModal('edit');
          setAnchorEl(null);
        }}
      />
    </>
  );
};

export default TableList;
