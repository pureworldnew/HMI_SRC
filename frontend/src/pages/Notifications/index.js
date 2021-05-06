import React, { useState, useEffect, PropTypes } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import SensorService from '../../services/SensorService';
import Header from '../Dashboard/Header';
import StepProgressBar from 'react-step-progress';

import 'react-step-progress/dist/index.css';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
// import { Editor } from 'react-draft-wysiwyg';
// import RichTextEditor from 'react-rte';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BodyTextEditor from '../../components/BodyTextEditor';
import './notifications.scss';

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
  const [age, setAge] = useState(10);
  const handleChange = (param) => {
    console.log(param, 'is target value');
    setAge(param);
  };

  const bull = <span className={classes.bullet}>•</span>;

  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);

  const noOfDatasInTable = 6;
  const noOfPages = parseInt(usersList.length / noOfDatasInTable);
  const dataInTable = usersList.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + noOfDatasInTable
  );

  const paginationComponent = () => {
    return (
      <div className="pagination" style={{ flex: 'auto' }}>
        <div
          className="pagination__prev"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}>
          Previous
        </div>
        <div className="pagination__pages">
          <ul>
            {Array(noOfPages + 1)
              .fill('')
              .map((d, index) => (
                <li
                  key={index + 'sjlk'}
                  className={`pagination__page ${
                    index === page ? `pagination__page--active` : null
                  }`}
                  onClick={() => {
                    setPage(index);
                  }}>
                  {index + 1}
                </li>
              ))}
          </ul>
        </div>
        <div
          className="pagination__next"
          onClick={() => {
            if (page < noOfPages) {
              setPage(page + 1);
            }
          }}>
          Next
        </div>
      </div>
    );
  };

  const [values, setValues] = useState({
    bodyText:
      'Temperature Data Greater Than 56 F \n\n Device: {Name} ({ID})\n\n Reading:{Reading}'
  });
  console.log(values);

  // setup the step content
  const step1Content = (
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
              onChange={(e) => handleChange(e.target.value)}>
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
              onChange={(e) => handleChange(e.target.value)}>
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
          style={{ minWidth: '16rem', minHeight: '4rem', fontSize: '1.5rem' }}>
          <FontAwesomeIcon icon="check-square" />
          Save
          <FontAwesomeIcon icon={faSave} className="ml-4" />
        </button>
      </CardActions>
    </Card>
  );

  const step2Content = (
    <Card className={classes.root}>
      <CardContent>
        <div>
          <div className="h2">Subject</div>
          <div>
            <input
              className="m-2 w-100"
              style={{ fontSize: '24px', minWidth: '150px' }}
              type="text"
              value="TemperatureData Greater Than 56 F"
              disabled
              placeholder="Temperature"></input>
          </div>
          <BodyTextEditor
            value={values.bodyText}
            setValue={(bodyText) => setValues({ ...values, bodyText })}
          />
        </div>
        <div>Recipent</div>
      </CardContent>
      <CardActions>
        <button
          className="btn btn-primary btn-lg m-auto"
          style={{ minWidth: '16rem', minHeight: '4rem', fontSize: '1.5rem' }}>
          Save
          <FontAwesomeIcon icon={faSave} className="ml-4" />
        </button>
      </CardActions>
    </Card>
  );
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
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: 'Notification Trigger Settings',
            subtitle: '10%',
            name: 'step 1',
            content: step1Content
          },
          {
            label: 'Notification Settings Module',
            subtitle: '50%',
            name: 'step 2',
            content: step2Content,
            validator: step2Validator
          },
          {
            label: 'Notification Sensors Module',
            subtitle: '100%',
            name: 'step 3',
            content: step3Content,
            validator: step3Validator
          }
        ]}
      />
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
