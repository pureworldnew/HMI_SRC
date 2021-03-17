import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// Button with three dots
// for search: ButtonDotsMore
//
export default ({ className, onClick, style, popoverId }) => {
  return (
    <IconButton
      style={{ ...style }}
      className={className}
      aria-controls={popoverId}
      aria-haspopup="true"
      onClick={onClick}>
      <MoreHorizIcon style={{ fontSize: '2.25rem', color: '#000000' }} />
    </IconButton>
  );
};
