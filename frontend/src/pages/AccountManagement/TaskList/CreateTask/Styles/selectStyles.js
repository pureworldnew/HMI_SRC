import React from 'react';

function customStyles() {
  return {
    container: (provided) => ({
      ...provided,
      width: '100%'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      display: 'none'
    }),
    input: (provided, state) => ({
      ...provided,
      width: '100%'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      paddingLeft: 30,
      fontWeight: 600,
      fontSize: 14,
      color: '#868E9A'
    })
  };
}
export default customStyles;
