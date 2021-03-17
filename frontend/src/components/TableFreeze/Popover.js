import React from 'react';
import Popover from '@material-ui/core/Popover';

export default function SimplePopover({
  onClose,
  anchorEl,
  popoverId,
  ...props
}) {
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
      onClose={onClose}
      className="popover-action popover-action__freeze"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      {props.children}
    </Popover>
  );
}
