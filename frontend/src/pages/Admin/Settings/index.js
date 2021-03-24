import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Input } from 'reactstrap';
import './terminology.scss';
import AdminService from '../../../services/AdminService';
// selection option
const options = [
  { value: '1', label: 'Account Managers (AMs)' },
  { value: '2', label: 'Customer Success Managers (CSMs)' }
];

const contractOptions = [
  { value: 'TCV', label: 'TCV' },
  { value: 'ACV', label: 'ACV' }
];

const customeStyle = {
  container: (styles) => ({
    ...styles,
    width: '498px',
    fontSize: '14px',
    lineHeight: '20px'
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#1E2C36'
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

  const [lowLimitVol, setLowLimitVol] = useState('1.5');
  const [cautionLimitVol, setCautionLimitVol] = useState('2.0');

  const saveSettings = () => {
    setcontractStatus(!contractStatus);
    localStorage.setItem('contractStatus', selectContract);
    AdminService.setLimitVoltage(lowLimitVol, cautionLimitVol)
      .then((res) => {
        console.log('result of updating limit', res);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
    alert(`Set Limit Value as Successfully!`);
  };

  useEffect(() => {
    console.log('contract status: ', localStorage.getItem('contractStatus'));
  }, [contractStatus]);

  return (
    <div>
      <div className="panel terminology">
        <div className="panel-header terminology">
          <div className="panel-name terminology">Low Limit Voltage</div>
        </div>

        <div className="panel-body terminology setting">
          <Input
            type="number"
            name="lowLimit"
            id="lowLimit"
            placeholder=""
            value={lowLimitVol}
            onChange={(e) => setLowLimitVol(e.target.value)}
          />
        </div>
      </div>

      <div className="panel terminology">
        <div className="panel-header terminology">
          <div className="panel-name terminology">Caution Limit Voltage</div>
        </div>

        <div className="panel-body terminology setting">
          <Input
            type="number"
            name="cautionLimit"
            id="cautionLimit"
            placeholder=""
            value={cautionLimitVol}
            onChange={(e) => setCautionLimitVol(e.target.value)}
          />

          <button
            className="button button--block-admin-terminology"
            onClick={saveSettings}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terminology;
