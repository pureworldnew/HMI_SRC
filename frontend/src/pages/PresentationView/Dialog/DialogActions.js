import React from 'react';
import { withStyles, DialogActions, Button } from '@material-ui/core';

const styles = (theme) => ({});

const CustomDialogActions = withStyles(styles)((props) => {
  const { children, classes, handleClose, ...other } = props;

  return (
    <DialogActions>
      <div className="presentation-dialog-footer">
        <div className="presentation-dialog-footer-link">
          <div className="link-icon"></div>Copy Presentation Link to your
          clipboard
        </div>
        <Button onClick={handleClose} variant="contained" color="primary">
          Done
        </Button>
      </div>
    </DialogActions>
  );
});
export default CustomDialogActions;
