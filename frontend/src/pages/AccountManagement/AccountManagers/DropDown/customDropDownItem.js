import React, { useState, forwardRef } from 'react';
import CustomCheckbox from './customCheckbox';

const CustomDropDownItem = forwardRef(
  ({ children, value, accountsManaged }, ref) => {
    let [checked, setChecked] = useState(
      accountsManaged
        ? accountsManaged.findIndex((account) => account === value) > -1
        : false
    );
    const onChange = (event, ckValue) => {
      console.log(value);
      console.log(accountsManaged);
    };

    return (
      <li className="dropdown-item">
        <CustomCheckbox value={value} checked={checked} onChange={onChange} />
      </li>
    );
  }
);
export default CustomDropDownItem;
