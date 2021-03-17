import React from 'react';

function SelectStyles(props) {
  return {
    container: (propvied) => ({
      ...propvied,
      width: 150,
      marginRight: 24
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: 14,
      marginLeft: 12,
      fontWeight: 600,
      color: '#868E9A'
    }),
    control: (provided) => ({
      ...provided,
      border: 'none'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      width: 196
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '18px 20px',
      fontWeight: 600,
      fontSize: 14,
      color: '#868E9A',
      backgroundColor: 'transparent !important'
    })
  };
}
export default SelectStyles;
