import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import loadingImg from '../../../assets/gif/loading.gif';
import SelectSearchMultiple from '../../../components/SelectSearchMultiple';
import UserService from '../../../services/UserService';

export default function DrawerForm({ title, type, ...props }) {
  const dispatch = useDispatch();
  const effectLoading = useSelector(
    (state) => state.loading.effects.alerts.createAlert
  );
  let nameInput = useRef(null);
  const [drawer, setDrawer] = useState();
  const [data, setData] = useState();
  const [regularType, setRegularType] = useState();
  const [reportRegular, setReportRegular] = useState(false);
  const [alertData, setAlertData] = useState();
  const [alertName, setAlertName] = useState();
  const [recipients, setRecipients] = useState();

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    UserService.getUsersList()
      .then((res) => {
        setUsersList(res.data);
        props.updateState(false, 'add_new_user');
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  const toggleDrawer = (value) => {
    setDrawer(value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(value);
  };

  const onReport = () => {
    let formData = {};

    if (regularType && reportRegular) {
      formData = { reportCadence: regularType };
    }
    if (!data) {
      alert('Please provide all information!');
      return false;
    }
    formData.report = data;

    // dispatch.alerts.createAlert(data)
  };

  const onAlert = async () => {
    if ((!alertData && !alertName) || !recipients) {
      alert('Please provide all information!');
      return false;
    }

    let recipientsData = recipients.recipients.map((key) => ({
      userId: key.id,
      email: key.emailAddress
    }));

    const formData = {
      alertName: alertName.alertName,
      recipients: recipientsData
    };
    await dispatch.alerts.createAlert(formData);
    await dispatch.alerts.getAllAlerts();
    await setDrawer(false);
  };

  const reportOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];
  const frequencyOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'dailyWeekdays', label: 'Daily - Weekdays' },
    { value: 'dailyEveryday', label: 'Daily - Everyday' },
    { value: 'weekly', label: 'Weekly' }
  ];
  const notifyOptions = [
    { value: '90', label: 'Renewal in < 90 days' },
    { value: '60', label: 'Renewal in < 60 days' },
    { value: '30', label: 'Renewal in < 30 days' },
    { value: '0', label: 'Renewal date has passed' }
  ];
  return (
    <div style={{ flex: '0 0 auto' }}>
      <button
        className="button button--block-admin button-primary"
        onClick={() => {
          toggleDrawer(true);
          setTimeout(() => nameInput.current && nameInput.current.focus(), 300);
        }}>
        + Create New {type === 'report' ? 'Report' : 'Alert'}
      </button>
      <Drawer anchor="right" open={drawer} onClose={() => toggleDrawer(false)}>
        <div className="drawer-form" role="presentation">
          <div className="drawer-form__header">
            <h5 className="drawer-form__title">{title}</h5>
            <IconButton
              onClick={() => toggleDrawer(false)}
              aria-label="delete"
              size="small">
              <CloseIcon style={{ fontSize: '3rem' }} />
            </IconButton>
          </div>

          {type === 'report' ? (
            <div>
              <FormControl component="fieldset">
                <div
                  style={{
                    marginBottom: '7%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <RadioGroup
                    aria-label="report"
                    name="report"
                    value={data}
                    onChange={(e) => setReportRegular(e.target.value)}>
                    <FormControlLabel
                      value="regular_cadenze"
                      control={<Radio />}
                      label="Provide a report on regular candence"
                    />
                  </RadioGroup>
                  <label className="custom-label">Report Type</label>
                  <Select
                    classNamePrefix="select-react"
                    className="revenue_monthly select-outline"
                    options={reportOptions}
                    placeholder="Please select"
                    defaultValue="Please select"
                    onChange={(data) =>
                      setRegularType({ regularType: data.value })
                    }
                  />
                </div>
                <RadioGroup
                  aria-label="report"
                  name="report"
                  value={data}
                  onChange={handleChange}>
                  <FormControlLabel
                    style={{ marginBottom: '30px' }}
                    value="daily_completed"
                    control={<Radio />}
                    label="Provide a daily summary of tasks completed."
                  />
                  <FormControlLabel
                    style={{ marginBottom: '30px' }}
                    value="daily_need_completed"
                    control={<Radio />}
                    label="Provide daily summary of tasks that need to be completed"
                  />
                  <FormControlLabel
                    style={{ marginBottom: '30px' }}
                    value="month_revenue"
                    control={<Radio />}
                    label="Provide end of month revenue growth report"
                  />
                  <FormControlLabel
                    style={{ marginBottom: '30px' }}
                    value="quarter_revenue"
                    control={<Radio />}
                    label="Provide end of quarter revenue growth report"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            <div style={{ height: '100%', marginTop: '24px' }}>
              <div className="input-control" style={{ marginBottom: '40px' }}>
                <label>Alert Name</label>
                <input
                  ref={nameInput}
                  name="alert_name"
                  onChange={(e) => setAlertName({ alertName: e.target.value })}
                />
              </div>
              <div className="input-control" style={{ marginBottom: '40px' }}>
                <label className="custom-label">Notify me when</label>
                <Select
                  classNamePrefix="select-react"
                  className="revenue_monthly select-outline"
                  options={notifyOptions}
                  placeholder="Please select"
                  defaultValue="Please select"
                  onChange={(data) =>
                    setAlertData({ ...alertData, notify: data })
                  }
                />
              </div>
              <div className="input-control" style={{ marginBottom: '40px' }}>
                <label className="custom-label">Recipients</label>
                <SelectSearchMultiple
                  title="fullName"
                  label="id"
                  options={usersList}
                  onChange={(e, value) => setRecipients({ recipients: value })}
                  placeholder="Search recipients by name or e-mail"
                />
              </div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="button button--block-admin-teamcreatecancel"
              onClick={() => toggleDrawer(false)}>
              Cancel
            </button>
            <button
              className="button button--block-admin-teamcreate button-primary"
              onClick={() => (type === 'report' ? onReport() : onAlert())}>
              {type === 'report' ? '+ Create Report' : '+ Create Alert'}
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
