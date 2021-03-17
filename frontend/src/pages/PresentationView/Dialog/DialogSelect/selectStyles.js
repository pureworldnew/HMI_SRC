import React from 'react';
import { withStyles, InputBase } from '@material-ui/core';

export default withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: 'none',
    fontSize: 14,
    padding: '10px 26px 10px 12px',
    fontFamily: ['Open Sans'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: 'none'
    }
  }
}))(InputBase);
