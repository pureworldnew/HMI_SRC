import React from 'react';
import {
    withStyles, DialogTitle, IconButton, Typography
} from '@material-ui/core';


const styles = (theme) => ({
  root: {
    position: 'relative',
    margin: 0,
    padding: '0 0 32px',
    borderBottom: '1px solid #E4E4E4'
  },
  title: {
      fontSize: 24,
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 'bold'
  }
});

const CustomDialogTitle =  withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
      <DialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6" className={classes.title}>{children}</Typography>
        <div className="presentation-dialog-close" onClick={onClose}></div>
      </DialogTitle>
  );
});
export default CustomDialogTitle;
