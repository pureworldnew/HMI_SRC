import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SensorService from '../../services/SensorService';
import Header from '../Dashboard/Header';

import { connect } from 'react-redux';

import 'rsuite/dist/styles/rsuite-default.css';
import { Steps, Button, ButtonGroup } from 'rsuite';

import './notifications.scss';
import NotificationTrigger from './NotificationTrigger';
import NotificationSettings from './NotificationSettings';
import NotificationsSensors from './NotificationSensors';

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

const Notifications = (props) => {
  const classes = useStyles();

  const [step, setStep] = React.useState(2);
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const noOfDatasInTable = 6;
  const noOfPages = parseInt(usersList.length / noOfDatasInTable);
  const dataInTable = usersList.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + noOfDatasInTable
  );

  const onClickSettings = () => {
    setShowResults(!showResults);
  };

  console.log(showResults);

  const [values, setValues] = useState({
    bodyText:
      'Temperature Data Greater Than 56 F \n\n Device: {Name} ({ID})\n\n Reading:{Reading}'
  });

  // setup the step content

  const step3Content = <h1>Step 3 Content</h1>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    // return a boolean
    return true;
  }

  function step3Validator() {
    // return a boolean
    // return true;
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
    console.log('submitted');
  }

  useEffect(() => {
    console.log('here');
    SensorService.getAllSensors()
      .then((res) => {
        console.log('state change:', res);
        setUsersList(res.data);
        props.updateState(false);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return (
    <div className="dashboard revenue-insights">
      <Header title="Notifications" type="Notifications" />

      <div className="mt-5">
        <Steps current={step}>
          <Steps.Item
            title="Triggers"
            description="What triggers your notifications?"
          />
          <Steps.Item title="Settings" description="Notification Settings" />
          <Steps.Item title="Sensors" description="Notification Sensors" />
        </Steps>

        <hr />
        {step === 0 ? (
          <NotificationTrigger />
        ) : step === 1 ? (
          <NotificationSettings />
        ) : step === 2 ? (
          <NotificationsSensors />
        ) : (
          ''
        )}
        <hr />
        <ButtonGroup>
          <Button onClick={onPrevious} disabled={step === 0}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={step === 2}>
            Next
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

const mapDispatchToProps = ({ company: { updateState } }) => ({
  updateState: (value) => updateState(value)
});

const mapStateToProps = ({ sensor: { set_create_company } }) => ({
  set_create_company
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
