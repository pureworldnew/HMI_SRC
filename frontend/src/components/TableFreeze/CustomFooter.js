import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import { ReactComponent as PresentationViewSvg } from '../../assets/svg/presentation-view.svg';
import { usePagination } from '@material-ui/lab/Pagination';

function CustomFooter(props) {
  const {
    count,
    classes,
    textLabels,
    rowsPerPage,
    page,
    onViewPresentation
  } = props;

  const handleRowChange = (event) => {
    props.changeRowsPerPage(event.target.value);
  };

  const handlePageChange = (_, page) => {
    props.changePage(page);
  };

  const onChangePage = (page) => {
    page = page - 1;
    props.changePage(page);
  };

  const { items } = usePagination({ count: Math.ceil(count / rowsPerPage) });
  return (
    <TableFooter>
      <div className="table-footer">
        <div className="table-footer-left">
          <button
            className="button full-table-view"
            onClick={() => onViewPresentation()}
            style={{ width: '140px', height: '28px', padding: '0' }}>
            <PresentationViewSvg style={{ marginRight: '10px' }} />
            <span className={{ marginLeft: '14px' }}>Full Table View</span>
          </button>
        </div>
        <div className="table-footer-right" style={{ width: '100%' }}>
          <TablePagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            ActionsComponent={() => {
              return (
                <ul className="pagination-nav">
                  {items.map(({ page, type, selected, ...item }, index) => {
                    let children;
                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                      children = '…';
                    } else if (type === 'page') {
                      children = (
                        <button
                          type="button"
                          style={{ fontWeight: selected ? 'bold' : null }}
                          className={
                            selected
                              ? 'pagination-item-btn selected'
                              : 'pagination-item-btn'
                          }
                          {...item}>
                          {page}
                        </button>
                      );
                    } else {
                      children = (
                        <button type="button" {...item}>
                          {type}
                        </button>
                      );
                    }
                    return (
                      <li
                        className={`pagination-item-${type}`}
                        key={index}
                        onClick={() => onChangePage(page, type)}>
                        {children}
                      </li>
                    );
                  })}
                </ul>
              );
            }}
          />
        </div>
      </div>
    </TableFooter>
  );
}

export default CustomFooter;
