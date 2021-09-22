import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, ButtonGroup } from 'rsuite';

import Header from '../Dashboard/Header';
import NotificationTrigger from './NotificationTrigger';
import NotificationSettings from './NotificationSettings';
import NotificationsSensors from './NotificationSensors';

import 'rsuite/dist/styles/rsuite-default.css';
import './notifications.scss';

const Notifications = (props) => {
  const [step, setStep] = useState(0);
  const [trigger, setTrigger] = useState({});
  const [settings, setSettings] = useState({});
  const [actionName, setActionName] = useState('');

  const [sensorsList, setSensorsList] = useState([]);

  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => {
    console.log(trigger);
    console.log(settings);
    onChange(step + 1);
  };
  const onPrevious = () => onChange(step - 1);

  const handleTriggerChange = (triggerValue) => {
    setTrigger(triggerValue);
    onNext();
  };

  const handleSettingsChange = (settingsValue) => {
    console.log('param', settingsValue);
    setSettings(settingsValue);
    onNext();
  };

  const handleSensorsChange = (sensorsValue) => {
    let newArray = [...sensorsList, sensorsValue];
    if (sensorsList.includes(sensorsValue)) {
      newArray = newArray.filter((day) => day !== sensorsValue);
    }
    setSensorsList(newArray);
  };

  const handleActionNameSave = (actionName) => {
    setActionName(actionName);
  };

  const handleSensorComplete = () => {
    let paramNotificationData = {
      trigger: trigger,
      settings: settings,
      actionName: actionName ? actionName : settings.subject,
      sensorsList: sensorsList
    };
    console.log('paramNotificationData', paramNotificationData);
  };
  console.log('sensorsList', sensorsList);
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
          <NotificationTrigger onTriggerChange={handleTriggerChange} />
        ) : step === 1 ? (
          <NotificationSettings
            trigger={trigger}
            onSettingsChange={handleSettingsChange}
          />
        ) : step === 2 ? (
          <NotificationsSensors
            settings={settings}
            onSensorsChange={handleSensorsChange}
            onActionNameChange={handleActionNameSave}
            onSensorComplete={handleSensorComplete}
          />
        ) : (
          ''
        )}
        <hr />
        <ButtonGroup style={{ display: step === 0 ? 'none' : 'block' }}>
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
