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

const NotificationTrigger = () => {
  const classes = useStyles();
  const [age, setAge] = useState(10);
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
              aria-label="Default select example"
              onChange={(e) => setAge(e.target.value)}>
              <optgroup className="fs24">
                <option selected>Select Temperature Condition</option>
                <option value="10">Greater Than</option>
                <option value="20">Less Than</option>
              </optgroup>
            </select>
            <input
              className="m-2 w-25"
              style={{ fontSize: '24px' }}
              type="number"
              placeholder="Temperature"></input>
            <select
              className="form-select form-select-lg fs24 m-2"
              aria-label="Default select example"
              onChange={(e) => setAge(e.target.value)}>
              <optgroup className="fs24">
                <option selected>Select Temperature Unit</option>
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
            minWidth: '16rem',
            minHeight: '4rem',
            fontSize: '1.5rem'
          }}>
          <FontAwesomeIcon icon="check-square" />
          Save
          <FontAwesomeIcon icon={faSave} className="ml-4" />
        </button>
      </CardActions>
    </Card>
  );
};

export default NotificationTrigger;
