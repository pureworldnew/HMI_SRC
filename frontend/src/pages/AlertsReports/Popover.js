import React from 'react';
import { Menu, List, ListItemText, MenuItem } from '@material-ui/core';

export default function SimplePopover({
  anchorEl,
  popoverId,
  handleClose,
  onView,
  onPause,
  onDelete,
  onEdit
}) {
  const open = Boolean(anchorEl);
  const id = open ? popoverId : undefined;
  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <List
        component="nav"
        className="context-menu"
        aria-label="secondary mailbox folders">
        <MenuItem onClick={onView}>
          <ListItemText primary="View" />
        </MenuItem>
        <MenuItem onClick={onPause}>
          <ListItemText primary="Pause" />
        </MenuItem>
        <MenuItem onClick={onEdit}>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemText primary="Delete" />
        </MenuItem>
      </List>
    </Menu>
  );
}
