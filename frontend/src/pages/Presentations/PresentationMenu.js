import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  MenuItem,
  List,
  ListItemText,
  Divider,
  IconButton
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import exportPPTX from '../../utils/exportPPTX';

const PresentationMenu = (props) => {
  let { slides, history, action, name } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handlePresent = () => {
    setAnchorEl(null);
    action(slides, 'data');
    history.push('/presentation-view');
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="presentation-item-menu">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreHorizIcon style={{ fill: '#868E9A', top: 0 }} />
      </IconButton>
      <Menu
        key="presentation-menu"
        id="chart-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <List
          component="nav"
          className="context-menu"
          aria-label="secondary mailbox folders">
          <MenuItem onClick={handlePresent}>
            <ListItemText primary="Present" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText primary="Rename" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText primary="Delete" />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              exportPPTX(slides);
              handleClose();
            }}>
            <ListItemText primary="Export to PPTX" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText primary="Export to Google Slides" />
          </MenuItem>
        </List>
      </Menu>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  let { slides } = dispatch;
  return {
    action: slides.updateState
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationMenu);
