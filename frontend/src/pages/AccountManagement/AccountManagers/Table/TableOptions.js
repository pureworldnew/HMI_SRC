import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CustomSearch from '../../../../components/TableFreeze/CustomSearch';
import CustomFooter from '../../../../components/TableFreeze/CustomFooter';

const onViewPresentation = () => {
  console.log('Presentation button clicked ...');
};

function TableOptions({ data, ...props }) {
  return {
    page: 0,
    count: data ? data.length : 0,
    elevation: 0,
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
    pagination: true,
    rowsPerPage: 9,
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
          <IconButton>
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
          onViewPresentation={onViewPresentation}
        />
      );
    }
  };
}
export default TableOptions;
