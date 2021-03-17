import React from 'react';
import {
  withStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import CustomSelect from './DialogSelect';

const selectOptions = [
  { value: 'view', label: 'View only' },
  { value: 'edit', label: 'Edit' }
];

const CustomListItem = (props) => {
  const { data, color } = props;

  return (
    <ListItem>
      <ListItemAvatar>
        {
          <Avatar style={{ backgroundColor: color }}>
            {data.name.charAt(0)}
          </Avatar>
        }
      </ListItemAvatar>
      <ListItemText>
        {data.name} ({data.label})
      </ListItemText>
      <ListItemSecondaryAction>
        <CustomSelect options={selectOptions} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default CustomListItem;
