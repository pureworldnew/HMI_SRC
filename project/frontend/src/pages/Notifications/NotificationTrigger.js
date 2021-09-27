import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Fab from '@mui/material/Fab';
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

  const handleTriggerClick = () => {
    // if (
    //   !condition.temperatureCondition ||
    //   !condition.temperature ||
    //   !condition.temperatureUnit
    // ) {
    //   alert('Enter the necessary inputs');
    //   return;
    // }
    props.onTriggerChange(condition);
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
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than">Less Than</option>
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
        <Fab
          variant="extended"
          color="primary"
          aria-label="next"
          size="large"
          onClick={handleTriggerClick}
          className="btn btn-primary btn-lg m-auto"
          style={{
            minWidth: '16rem',
            minHeight: '4rem',
            fontSize: '1.5rem'
          }}>
          Next
        </Fab>
      </CardActions>
    </Card>
  );
};

export default NotificationTrigger;
