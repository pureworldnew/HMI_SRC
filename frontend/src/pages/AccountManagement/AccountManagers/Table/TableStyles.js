import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

function TableStyles(props) {
  const getMuiTheme = () => {
    return createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveScroll: {
            maxHeight: '555px !important',
            minHeight: 535,
            overflow: 'hidden'
          }
        },
        MuiTableHead: {
          root: {
            backgroundColor: '#F9FAFC'
          }
        },
        MUIDataTableHeadCell: {
          root: {
            backgroundColor: 'transparent !important',
            color: '#000000',
            fontFamily: 'Open Sans',
            fontWeight: 'bold',
            fontSize: 10,
            textTransform: 'uppercase',
            borderBottom: 'none !important'
          }
        },
        MUIDataTableBodyCell: {
          root: {
            padding: '8px 15px;',
            fontSize: 14,
            color: '#000000'
          }
        },
        MuiTableCell: {
          root: {
            borderBottom: '1px solid #B3B3B3'
          }
        },
        MuiToolbar: {
          root: {
            minHeight: '50px !important',
            padding: '0px !important'
          }
        },
        MuiIconButton: {
          root: {
            padding: 0
          }
        },
        MUIDataTableBodyRow: {
          root: {
            height: 54
          }
        },
        MUIDataTableToolbar: {
          actions: {
            '& button[aria-label="Search"]': {
              display: 'none'
            }
          },
          left: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }
        }
      }
    });
  };
  return getMuiTheme();
}
export default TableStyles;
