import React from 'react';
import { components } from 'react-select';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className="presentation--select"></div>
    </components.DropdownIndicator>
  );
};
export default DropdownIndicator;
