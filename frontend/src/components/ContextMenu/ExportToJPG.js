import React from 'react';
import { MenuItem, ListItemText } from '@material-ui/core';
import domToImage from '../../utils/exportJPG';

const ExportToJPG = (props) => {
  let { elementToConvert, imageName, handleClose } = props;

  const exportJPG = (event) => {
    domToImage(elementToConvert.current, imageName);
    handleClose();
  };

  return (
    <MenuItem id="jpg" onClick={exportJPG}>
      <ListItemText primary="JPG" />
    </MenuItem>
  );
};
export default ExportToJPG;
