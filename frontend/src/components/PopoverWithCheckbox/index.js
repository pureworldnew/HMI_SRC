import { Popover } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

export default ({ anchorEl, handleClose, popoverId }) => {
  const open =
    Boolean(anchorEl) &&
    anchorEl !== null &&
    anchorEl.getAttribute('aria-controls') === `simple-popover-${popoverId}`;
  const id = open ? `simple-popover-${popoverId}` : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid container spacing={1}>
        <Grid key={key.name} item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={false}
                //onChange={handleChange}
                name="name"
                color="primary"
              />
            }
            label={key.label}
          />
        </Grid>
      </Grid>
    </Popover>
  );
};
