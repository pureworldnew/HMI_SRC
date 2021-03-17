import React, { useState } from 'react';
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';

const checkStyles = makeStyles({
  checked: {
    '&, & + $label': {
      color: '#fff !important'
    }
  },
  label: {
    color: '#868E9A !important'
  },
  checkedIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#1C5DE1',
    borderRadius: 4,
    backgroundImage:
      'url("data:image/svg+xml;base64, PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IiMxQzVERTEiLz4KPHBhdGggZD0iTTE4Ljc0NzEgOC4xMTYxMkwxNy41MTg3IDYuODg3NzVDMTcuMzUwMyA2LjcxOTIgMTcuMTQ1NSA2LjYzNDg5IDE2LjkwNDcgNi42MzQ4OUMxNi42NjM3IDYuNjM0ODkgMTYuNDU4OCA2LjcxOTIgMTYuMjkwNCA2Ljg4Nzc1TDEwLjM2NTIgMTIuODIyTDcuNzA5NjYgMTAuMTU3NEM3LjU0MTA0IDkuOTg4NzggNy4zMzYzMiA5LjkwNDU3IDcuMDk1NTQgOS45MDQ1N0M2Ljg1NDYgOS45MDQ1NyA2LjY0OTg4IDkuOTg4NzggNi40ODEyNiAxMC4xNTc0TDUuMjUyOSAxMS4zODU4QzUuMDg0MjggMTEuNTU0NCA1IDExLjc1OTIgNSAxMi4wMDAxQzUgMTIuMjQwOCA1LjA4NDI4IDEyLjQ0NTggNS4yNTI5IDEyLjYxNDNMOC41MjI1MiAxNS44ODM5TDkuNzUwOTggMTcuMTEyMkM5LjkxOTUgMTcuMjgwOSAxMC4xMjQzIDE3LjM2NTEgMTAuMzY1MiAxNy4zNjUxQzEwLjYwNTkgMTcuMzY1MSAxMC44MTA3IDE3LjI4MDcgMTAuOTc5MyAxNy4xMTIyTDEyLjIwNzggMTUuODgzOUwxOC43NDcxIDkuMzQ0NThDMTguOTE1NiA5LjE3NTk2IDE5IDguOTcxMjEgMTkgOC43MzAzQzE5LjAwMDEgOC40ODk1MiAxOC45MTU2IDguMjg0NzQgMTguNzQ3MSA4LjExNjEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+")'
  },
  icon: {
    width: 20,
    height: 20,
    background: '#868E9A',
    mask:
      'url("data:image/svg+xml;base64, PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjEiIHk9IjEiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIHN0cm9rZT0iIzg2OEU5QSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==")'
  }
});

const CustomCheckbox = ({ value, checked, onChange }) => {
  let classes = checkStyles();

  return (
    <FormControlLabel
      classes={{
        label: classes.label
      }}
      control={
        <Checkbox
          icon={<span className={classes.icon} />}
          checkedIcon={<span className={classes.checkedIcon} />}
          disableRipple
          checked={checked}
          onChange={onChange}
          classes={{ checked: classes.checked }}
        />
      }
      label={value}
    />
  );
};
export default CustomCheckbox;
