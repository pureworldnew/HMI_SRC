import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import './terminology.scss';
import AdminService from '../../../services/AdminService';
// selection option

const Terminology = () => {
  const [lowLimitVol, setLowLimitVol] = useState('1.5');
  const [cautionLimitVol, setCautionLimitVol] = useState('2.0');
  useEffect(() => {
    AdminService.getLimitVal()
      .then((res) => {
        setLowLimitVol(res.data[0].lowLimitVol);
        setCautionLimitVol(res.data[0].cautionLimitVol);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);
  const saveSettings = () => {
    AdminService.setLimitVoltage(lowLimitVol, cautionLimitVol)
      .then((res) => {
        console.log('result of updating limit', res);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
    alert(`Set Limit Value as Successfully!`);
  };

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
