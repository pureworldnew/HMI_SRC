import React from 'react';
import { ListItem, ListItemText, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SelectedAssigneesComponent = (props) => {
  return (
    <ListItem className="selected-assigners-item">
      <Avatar className="select-avatar" src={props.url} />
      <ListItemText className="manager-label">
        {props.label} (<span>{props.managerLabel}</span>)
        <CloseIcon
          className="select-close"
          onClick={props.onDeselect.bind(null, props)}
        />
      </ListItemText>
    </ListItem>
  );
};
export default SelectedAssigneesComponent;
