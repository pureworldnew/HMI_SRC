import React, { useState } from 'react';

import {
    Checkbox, Menu, MenuItem, IconButton,
    List, ListItem, ListItemText, makeStyles
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TaskListAssignComponent from './taskListAssignComponent';




const listCheckboxStyles = makeStyles({
    root: {
        marginLeft: 10,
        '&:hover': {
            backgroundColor: 'transparent !important'
        },
    },
    checkedIcon: {
        width: 20,
        height: 20,
        background: '#3CD278',
        mask:
        "url(\"data:image/svg+xml;base64, PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05Ljk5OTk1IDBDNC40ODYwMSAwIDAgNC40ODU5MSAwIDkuOTk5OTVDMCAxNS41MTQgNC40ODYwMSAyMCA5Ljk5OTk1IDIwQzE1LjUxMzkgMjAgMTkuOTk5OSAxNS41MTQgMTkuOTk5OSA5Ljk5OTk1QzE5Ljk5OTkgNC40ODU5MSAxNS41MTQgMCA5Ljk5OTk1IDBaTTE1Ljc0MjEgOC4zMTA4N0w5LjQ1OTYzIDE0LjU5MzNDOS4xOTI1IDE0Ljg2MDUgOC44Mzc0MSAxNS4wMDc1IDguNDU5NjcgMTUuMDA3NUM4LjA4MTkzIDE1LjAwNzUgNy43MjY4NCAxNC44NjA1IDcuNDU5NzEgMTQuNTkzM0w0LjI1NzggMTEuMzkxNEMzLjk5MDY3IDExLjEyNDMgMy44NDM1NCAxMC43NjkyIDMuODQzNTQgMTAuMzkxNUMzLjg0MzU0IDEwLjAxMzYgMy45OTA2NyA5LjY1ODUyIDQuMjU3OCA5LjM5MTM5QzQuNTI0ODMgOS4xMjQyNiA0Ljg3OTkyIDguOTc3MTMgNS4yNTc3NiA4Ljk3NzEzQzUuNjM1NSA4Ljk3NzEzIDUuOTkwNyA5LjEyNDI2IDYuMjU3NzMgOS4zOTE1TDguNDU5NTcgMTEuNTkzMkwxMy43NDIgNi4zMTA4NEMxNC4wMDkxIDYuMDQzNzEgMTQuMzY0MiA1Ljg5NjY5IDE0Ljc0MTkgNS44OTY2OUMxNS4xMTk3IDUuODk2NjkgMTUuNDc0OCA2LjA0MzcxIDE1Ljc0MTkgNi4zMTA4NEMxNi4yOTM1IDYuODYyNDIgMTYuMjkzNSA3Ljc1OTUgMTUuNzQyMSA4LjMxMDg3WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+\")"
    },
    icon: {
        width: 20,
        height: 20,
        background: '#868E9A',
        mask:
        "url(\"data:image/svg+xml;base64, PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05Ljk4NzY5IDBDNC40NjgxOCAwIDAgNC40NzM2IDAgMTBDMCAxNS41MjY0IDQuNDY4MTggMjAgOS45ODc2OSAyMEMxNS41MDcyIDIwIDE5Ljk3NTQgMTUuNTI2NCAxOS45NzU0IDEwQzE5Ljk3NTQgNC40NzM2IDE1LjUwNzIgMCA5Ljk4NzY5IDBaTTkuOTg3NjkgMTguMjQ1NUM1LjQzMTkgMTguMjQ1NSAxLjc1MjIzIDE0LjU2MTIgMS43NTIyMyA5Ljk5OTc5QzEuNzUyMjMgNS40MzgzNyA1LjQzMTkgMS43NTQzMSA5Ljk4NzY5IDEuNzU0MzFDMTQuNTQzNSAxLjc1NDMxIDE4LjIyMzIgNS40Mzg1OCAxOC4yMjMyIDEwQzE4LjIyMzIgMTQuNTYxNCAxNC41NDM1IDE4LjI0NTUgOS45ODc2OSAxOC4yNDU1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+\")"
    }
});




const TaskListContent = (props) => {
    let { index, item } = props;
    let classes = listCheckboxStyles();
    let [anchorEl, setAnchorEl] = useState(null);
    let [itemState, setItemState] = useState(item);


    let handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    let handleChange = (event, checked) => {
        setItemState({
            ...itemState,
            isActive: checked
        });
    };
    let handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div className="taskls taskls-item-row" key={index}>
            <div className="taskls-item state t-state">
                <Checkbox
                    id={index.toString()}
                    className={classes.root}
                    disableRipple
                    icon={<span className={classes.icon} />}
                    checkedIcon={<span className={classes.checkedIcon} />}
                    value={`ck-${index}`}
                    inputProps={{ 'aria-label': `ck-${index}` }}
                    checked={itemState.isActive}
                    onChange={handleChange}
                />
            </div>
            <div className="taskls-item t-name">{itemState.type1}</div>
            <div className="taskls-item t-company">{itemState.type2}</div>
            <div className="taskls-item date t-timeremain">
                <div className="progress-date">
                    <div style={{ width: itemState.progress }}>
                    </div>
                </div>
                <span className="date-text">{itemState.date}</span>
            </div>
            <div className="taskls-item t-assignees">
                <TaskListAssignComponent assign={itemState.assign || []} />
            </div>
            <div className="taskls-item t-comments">
                <div></div> ({itemState.comments})
            </div>
            <div className="taskls-item active status t-status">
                {
                    itemState.isActive
                        ? <><div className="active"></div> Active</>
                        : <><div className="inactive"></div> inactive</>
                }
            </div>
            <div className="tasklsMoreIcon t-options">
                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >

                    <List component="nav" className="MuiListItem-gutters" aria-label="secondary mailbox folders">
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="Mark as Complete" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="Delete" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="Edit" />
                        </MenuItem>
                    </List>

                </Menu>
            </div>
        </div>
    );
};
export default TaskListContent;
