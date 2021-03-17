import React from 'react';
import { makeStyles } from '@material-ui/core';

function autoCompleteStyles(props) {
  return makeStyles({
    textField: {
      margin: 0,
      '& input': {
        fontFamily: 'Open Sans',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 20
      },
      '& input::placeholder': {
        fontFamily: 'Open Sans',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 20,
        color: '#868E9A',
        opacity: '0.85'
      }
    },
    option: {
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: 14,
      padding: '14px 20px'
    }
  });
}
export default autoCompleteStyles;
