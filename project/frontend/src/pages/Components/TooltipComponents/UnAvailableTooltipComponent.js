import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const UnAvailableToolTip = withStyles((theme) => ({
    tooltip: {
      fontSize: 11
    }
  }))(Tooltip);

  export default UnAvailableToolTip;