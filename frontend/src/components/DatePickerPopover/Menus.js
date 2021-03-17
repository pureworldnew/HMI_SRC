import React, { useEffect, useState, useRef } from 'react';
import { Button, Popover, IconButton, Menu, MenuItem } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowBackIos';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import Select from 'react-select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const menuItemList = {
  quarterly: ['Year range', 'YTD (Year to Date)', 'Last 4 quarters'],
  monthly: ['Year range', 'YTD (Year to Date)', 'Last 4 quarters']
};

const menuItemChapter = ['monthly', 'quarterly', 'yearly'];

export default function Menus({ setSearchOption, value, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [path, setPath] = useState(null);
  const onClickHeaderMenu = (event) => {
    if (!path) {
      setAnchorEl(event.currentTarget);
    } else {
      setPath(null);
    }
  };

  const handleClose = (e) => {
    if (e.currentTarget !== anchorEl) {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    setAnchorEl(null);
    setPath(null);
  }, [value]);

  return (
    <div>
      <IconButton
        onClick={(e) => onClickHeaderMenu(e)}
        size="large"
        aria-controls="datepicker-menu-root"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        className="datepicker-menu-root__button">
        Select
        <ExpandMoreIcon
          style={{
            marginLeft: '12px',
            color: '#495660'
          }}
        />
      </IconButton>
      <Menu
        id="datepicker-menu-root"
        className="datepicker-menu-root"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem
          className="datepicker-menu-root__header"
          onClick={() => setPath(null)}>
          {path ? (
            <span>
              <ChevronLeftIcon /> {path}
            </span>
          ) : (
            <>
              Select
              <ExpandLessIcon
                style={{
                  marginLeft: '12px',
                  color: '#495660'
                }}
              />
            </>
          )}
        </MenuItem>
        {path
          ? menuItemList[path] &&
            menuItemList[path].map((key) => {
              return (
                <MenuItem onClick={() => setSearchOption(path, key)}>
                  {key}
                </MenuItem>
              );
            })
          : menuItemChapter.map((key) => {
              return (
                <MenuItem
                  onClick={() =>
                    key === 'yearly' ? setSearchOption(key) : setPath(key)
                  }
                  style={{ textTransform: 'capitalize' }}>
                  {key}
                </MenuItem>
              );
            })}
      </Menu>
    </div>
  );
}
