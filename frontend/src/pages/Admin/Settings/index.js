import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './terminology.scss';

// selection option
const options = [
  { value: '1', label: 'Account Managers (AMs)' },
  { value: '2', label: 'Customer Success Managers (CSMs)' }
];

const contractOptions = [
  { value: 'TCV', label: 'TCV' },
  { value: 'ACV', label: 'ACV' }
]

const customeStyle = {
  container: (styles) => ({
    ...styles,
    width: '498px',
    fontSize: '14px',
    lineHeight: '20px'
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#1E2C36',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#1E2C36',
    fontSize: '14px',
    lineHeight: '20px'
  }),
  singleValue: (styles) => ({
    ...styles,
    fontSize: '14px',
    lineHeight: '20px',
    top: '31px'
  }),
  indicatorSeparator: (styles) => false,
  control: (styles, { isFocused }) => ({
    ...styles,
    height: '56px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles
    };
  }
};

const Terminology = () => {
  // const [selectedOption, setSelectedOption] = useState(1);
  const [selectContract, setselectContract] = useState('ACV');
  const [contractStatus, setcontractStatus] = useState(true);

  // const handleChange = (selectedOption) => {
  //   setSelectedOption({selectedOption});
  // }

  const saveContract = () => {
    // console.log('save contract');
    setcontractStatus(!contractStatus);
    localStorage.setItem('contractStatus', selectContract);
    alert(`Set Contract Value as ${selectContract} Successfully!`);
  }

  const contractHandleChange = (value) => {
    // console.log('contract value: ', value);
    setselectContract(value);
  }

  useEffect(() => {
    console.log('contract status: ', localStorage.getItem('contractStatus'));
  }, [contractStatus])

  return (
    <div>
      <div className="panel terminology">
        <div className="panel-header terminology">
          <div className="panel-name terminology">Naming</div>
        </div>

        <div className="panel-body terminology setting">
          <label>Preferred name</label>
          <Select
            // value={selectedOption}
            // onChange={handleChange}
            classNamePrefix="select-react"
            className="select-outline"
            options={options}
            styles={customeStyle}
            placeholder="Account Managers (AMs)"
          />

          <button className="button button--block-admin-terminology">
            Save Changes
          </button>
        </div>

      </div>

      <div className="panel terminology">
        <div className="panel-header terminology">
          <div className="panel-name terminology">Contract Values</div>
        </div>

        <div className="panel-body terminology setting">
          <label>Contract value used for display</label>
          <Select
            // value={selectContract}
            onChange={(e) => contractHandleChange(e.value)}
            classNamePrefix="select-react"
            className="select-outline"
            options={contractOptions}
            styles={customeStyle}
            placeholder={localStorage.getItem('contractStatus')}
          />

          <button className="button button--block-admin-terminology" onClick={saveContract}>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default Terminology;
