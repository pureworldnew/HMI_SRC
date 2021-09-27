import React, {useState} from "react";
import useSortableData from './SortablTable';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const UserTable = (props) => {

    const [anchor, setAnchor] = useState(null);

    const handleClick = event => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const header = props.header[0];
    let keys = Object.keys(header);
    const { items, requestSort, sortConfig } = useSortableData(props.data);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
      <table className="UserTable">
        <thead>
          <tr>
            {keys.map(key => (
                <th key={key}>
                    <button
                    type="button"
                    onClick={() => requestSort(key)}
                    className={getClassNamesFor(key)}
                    >
                    {header[key]}
                    </button>
                </th>
            ))}
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                  <div>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="black"/>
                    </svg>
                    <span>{item.fullName}</span>
                    </div>
              </td>
              <td>{item.emailAddress}</td>
              <td>{item.userId}</td>
              <td>{item.lastLogin}</td>
              <td>{item.createDate}</td>
              <td>{item.role}</td>
              <td>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    anchorEl={anchor}
                    keepMounted
                    open={Boolean(anchor)}
                    onClose={handleClose}
                    >
                    <List component="nav" aria-label="secondary mailbox folders">
                        <MenuItem onClick={handleClose}>
                            <ListItem >
                                <ListItemText primary="Pause Account" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItem >
                                <ListItemText primary="Edit Account" />
                            </ListItem>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItem>
                                <ListItemText primary="Send Password  Reset Link" />
                            </ListItem>
                        </MenuItem>
                    </List>
                </Menu>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default UserTable;
