import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  },
  root: {
    minWidth: 275,
    marginTop: 50,
    padding: 16
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  pos: {
    marginBottom: 12
  }
}));
const NotificationTrigger = (props) => {
  const classes = useStyles();
  const [condition, setCondition] = useState({
    temperatureCondition: '',
    temperature: 0,
    temperatureUnit: ''
  });

  const saveCondition = () => {
    if (
      !condition.temperatureCondition ||
      !condition.temperature ||
      !condition.temperatureUnit
    ) {
      return;
    }
    props.onSaveCondition(condition);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          <div className="mt-4 h2 font-weight-bold">
            Notification Trigger Conditions
          </div>
          <div className="mt-4 h4 font-weight-bold text-center py-4">
            Notify when temperature reading is:
          </div>
          <div className="d-flex setting-notification justify-content-center">
            <select
              className="form-select form-select-lg fs24 m-2"
              aria-label="Select Temperature Condition"
              defaultValue="Select Temperature Condition"
              onChange={(e) =>
                setCondition({
                  ...condition,
                  temperatureCondition: e.target.value
                })
              }>
              <optgroup className="fs24">
                <option value="">Select Temperature Condition</option>
                <option value="greaterThan">Greater Than</option>
                <option value="lessThan">Less Than</option>
              </optgroup>
            </select>
            <input
              className="m-2 w-25 fs24"
              type="number"
              placeholder="Temperature"
              onChange={(e) =>
                setCondition({ ...condition, temperature: e.target.value })
              }
            />
            <select
              className="form-select form-select-lg fs24 m-2"
              aria-label="Select Temperature Unit"
              defaultValue="Select Temperature Unit"
              onChange={(e) =>
                setCondition({ ...condition, temperatureUnit: e.target.value })
              }>
              <optgroup className="fs24">
                <option value="">Select Temperature Unit</option>
                <option value="F">Fahrenheit</option>
                <option value="C">Celsius</option>
              </optgroup>
            </select>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <button
          className="btn btn-primary btn-lg m-auto"
          style={{
            minWidth: '12rem',
            minHeight: '4rem',
            fontSize: '1.5rem'
          }}
          onClick={saveCondition}>
          Save
          <FontAwesomeIcon icon={faSave} className="ml-4" />
        </button>
      </CardActions>
    </Card>
  );
};

export default NotificationTrigger;
