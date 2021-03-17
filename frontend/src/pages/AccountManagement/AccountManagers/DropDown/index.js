import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomMenu from './customMenu';
import CustomToggle from './customToggle';
import CustomDropDownItem from './customDropDownItem';

const CustomDropDown = ({
  managers,
  accountsManaged,
  accountManager,
  withToggle,
  ...props
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        withToggle={withToggle}
        id="dropdown-custom-components">
        {props.children}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} accountManager={accountManager}>
        {managers.map((manager, index) => {
          return (
            <Dropdown.Item
              key={index}
              as={CustomDropDownItem}
              value={manager}
              accountsManaged={accountsManaged}
            />
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default CustomDropDown;
