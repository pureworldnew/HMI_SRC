import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';
import BodyTextEditor from '../../components/BodyTextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faInfoCircle,
  faUser,
  faPaperPlane,
  faSms,
  faPhoneVolume,
  faAngleDoubleDown,
  faAngleDoubleUp
} from '@fortawesome/free-solid-svg-icons';
import { Button, Toggle } from 'rsuite';

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

const NotificationSettings = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    bodyText: `Temperature Data ${props.trigger.temperatureCondition} ${props.trigger.temperature} ${props.trigger.temperatureUnit} \n\n Device: {Name} ({ID})\n\n Reading:{Reading}`
  });

  const nameArray = ['Joseph Richter', 'Joseph', 'Joseph Richter', 'Joseph'];

  const [showResults, setShowResults] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const [snoozePeriod, setSnoozePeriod] = useState('60');
  const [snoozeMode, setSnoozeMode] = useState('');
  const [acknowledgeMode, setAcknowledgeMode] = useState('');

  const handleSettingsClick = () => {
    props.onSettingsChange({
      subject: inputValue,
      message: values,
      user: {
        userId: 1,
        email: true,
        sms: true,
        voice: false
      },
      extra: {
        smsMessage: smsMessage,
        voiceText: voiceText,
        snoozePeriod: snoozePeriod,
        snoozeMode: snoozeMode,
        acknowledgeMode: acknowledgeMode
      }
    });
  };

  const inputValue = `Temperature Data ${props.trigger.temperatureCondition} ${props.trigger.temperature} ${props.trigger.temperatureUnit}`;

  return (
    <Card className={classes.root}>
      <CardContent className="row">
        <div className="col-md-6 col-sm-12">
          <div className="h2">Subject</div>
          <input
            className="w-100 my-4"
            style={{ fontSize: '24px', minWidth: '150px' }}
            type="text"
            value={inputValue}
            disabled
            placeholder="Temperature"
          />

          <div className="h2">
            Message: <FontAwesomeIcon icon={faInfoCircle} className="ml-2" />
          </div>
          <BodyTextEditor
            value={values.bodyText}
            setValue={(bodyText) => setValues({ ...values, bodyText })}
          />
        </div>
        <div className="col-md-6 col-sm-12 bg-gradient-primary">
          <div className="searchInputUser row w-100">
            <div className="input-group mb-3 input-group-lg">
              <div className="input-group-prepend w-50">
                <span
                  className="input-group-text w-100 text-center"
                  id="basic-addon3">
                  Click on icon to enable or disable
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="Search User Name"
              />
            </div>
          </div>
          <div
            className="notification-header row w-100 align-items-center mb-4"
            style={{ backgroundColor: '#e3e3e3', height: '36px' }}>
            <div className="col">Recipient</div>
            <div className="col">Email</div>
            <div className="col">SMS</div>
            <div className="col">Voice</div>
          </div>
          <div>
            <table className="table">
              <tbody>
                {nameArray.map((value, index) => (
                  <tr className="row mb-2" key={index}>
                    <td className="col">
                      <FontAwesomeIcon icon={faUser} className="mr-4 fa-2x" />
                      {value}
                    </td>
                    <td className="col">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="mr-4 fa-2x"
                      />
                    </td>
                    <td className="col">
                      <FontAwesomeIcon
                        icon={faSms}
                        className="mr-4 fa-2x text-success"
                      />
                    </td>
                    <td className="col">
                      <FontAwesomeIcon
                        icon={faPhoneVolume}
                        className="mr-4 fa-2x"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <Button
            className="btn btn-light btn-lg m-auto"
            onClick={() => setShowResults(!showResults)}
            style={{
              minWidth: '16rem',
              minHeight: '4rem',
              fontSize: '1.5rem'
            }}>
            Advanced Settings
            <FontAwesomeIcon
              icon={showResults ? faAngleDoubleUp : faAngleDoubleDown}
              className="ml-4"
            />
          </Button>
          {showResults && (
            <div
              className="container-fluid"
              style={{ transition: 'visibility 5s' }}>
              <div className="row" align="center">
                <div className="col-md row">
                  <div className="col">
                    <div className="h2">SMS Message(160 max):</div>
                    <div>
                      {' '}
                      <textarea
                        rows="3"
                        className="h2 p-4"
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        placeholder="If left blank, default message used"></textarea>
                    </div>
                  </div>
                  <div className="col">
                    <div className="h2">Voice Text:</div>
                    <div>
                      {' '}
                      <textarea
                        rows="3"
                        className="h2 p-4"
                        value={voiceText}
                        onChange={(e) => setVoiceText(e.target.value)}
                        placeholder="If left blank, default message used"></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md row align-items-center justify-content-between">
                  <div className="">
                    {' '}
                    <div className="h2">
                      Snooze: Don't Alert again for (Minutes):
                    </div>
                    <input
                      className=""
                      style={{ fontSize: '24px' }}
                      type="text"
                      value={snoozePeriod}
                      onChange={(e) => setSnoozePeriod(e.target.value)}
                      placeholder="60"></input>
                  </div>
                  <div className="d-flex flex-column align-items-between justify-content-around h-100">
                    <div className="row">
                      {' '}
                      <div className="h2 pr-2">Snooze each trigger:</div>
                      <div>
                        <Toggle
                          size="lg"
                          checkedChildren="Independently"
                          unCheckedChildren="Jointly"
                          onChange={(e) => setSnoozeMode(e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      {' '}
                      <div className="h2 pr-2">Acknowledgement Mode:</div>
                      <div>
                        <Toggle
                          size="lg"
                          checkedChildren="Auto"
                          unCheckedChildren="Manual"
                          onChange={(e) => setAcknowledgeMode(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            className="btn btn-primary btn-lg mx-auto my-4"
            style={{
              minWidth: '16rem',
              minHeight: '4rem',
              fontSize: '1.5rem'
            }}
            onClick={handleSettingsClick}>
            Next
            <FontAwesomeIcon icon={faSave} className="ml-4" />
          </button>
        </div>
      </CardActions>
    </Card>
  );
};

export default NotificationSettings;
