import React from 'react';

import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

import './popovercomponent.scss';

const PopoverItem = (props) => {
  const { id, placement } = props;

  return (
    <span className="customPopOver">
      <IconButton id={'Popover-' + id}>
        <MoreHorizIcon />
      </IconButton>
      <UncontrolledPopover
        trigger="legacy"
        placement={placement}
        target={'Popover-' + id}>
        <PopoverBody>
          <div className="pause-account">
            <span>Pause Account</span>
            <Switch
              // checked={accountPause}
              // onChange={handleChange}
              color="default"
              name="accountPause"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          <Divider />
          <div className="popover-btn-wrapper">
            <div className="first">
              <button>Edit Account</button>
            </div>
            <div className="second">
              <button>Send Password Reset Link</button>
            </div>
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </span>
  );
};

export default PopoverItem;
