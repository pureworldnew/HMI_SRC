import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  withStyles
} from '@material-ui/core';
import CustomDialogTitle from './DialogTitle';
import CustomDialogActions from './DialogActions';
import CustomDialogContent from './DialogContent';

const mockData = [
  { name: 'Pam Beesley', label: 'p.beesly@gmail.com', avatar: '' },
  { name: 'Michael Scott', label: 'michaelscott@gmail.com', avatar: '' },
  { name: 'Managers', label: 'Team • 6 members', avatar: '' }
];

const ShareDialog = ({ open, handleClose, ...props }) => {
  return (
    <Dialog
      id="presentation-dialog"
      open={open}
      modal="true"
      fullWidth={true}
      maxWidth={false}>
      <CustomDialogTitle onClose={handleClose}>
        Share Presentation
      </CustomDialogTitle>

      <CustomDialogContent data={mockData} />

      <CustomDialogActions handleClose={handleClose} />
    </Dialog>
  );
};
export default ShareDialog;
