import React from 'react';
import { ListItem, ListItemText, Avatar } from '@material-ui/core';

const SelectAssignLabel = (props) => {
  return (
    <ListItem className="selected-assigners-option">
      <Avatar className="select-avatar" src={props.url} />
      <ListItemText>
        {props.label} (
        <span className="manager-label">{props.managerLabel}</span>)
      </ListItemText>
    </ListItem>
  );
};
export default SelectAssignLabel;
