import React from 'react';
import { withStyles, NativeSelect, InputBase } from '@material-ui/core';
import SelectInput from './selectStyles';
import ArrowIcon from './selectArrow';

const CustomSelect = ({ options, SelectStyleComponent, ...props }) => {
  return (
    <NativeSelect
      IconComponent={ArrowIcon}
      input={SelectStyleComponent ? <SelectStyleComponent /> : <SelectInput />}>
      {options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </NativeSelect>
  );
};
export default CustomSelect;
