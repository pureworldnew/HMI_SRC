import React from 'react';
import { connect } from 'react-redux';
import { Steps, Button, ButtonGroup } from 'rsuite';

import Header from '../Dashboard/Header';
import NotificationTrigger from './NotificationTrigger';
import NotificationSettings from './NotificationSettings';
import NotificationsSensors from './NotificationSensors';

import 'rsuite/dist/styles/rsuite-default.css';
import './notifications.scss';

const Notifications = (props) => {
  const [step, setStep] = React.useState(1);
  const [condition, setCondition] = React.useState([]);
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => {
    console.log(condition);
    onChange(step + 1);
  };
  const onPrevious = () => onChange(step - 1);

  const onSaveCondition = (tempCondition) => {
    setCondition(tempCondition);
    onNext();
  };

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
          <NotificationTrigger onSaveCondition={onSaveCondition} />
        ) : step === 1 ? (
          <NotificationSettings triggerCondition={condition} />
        ) : step === 2 ? (
          <NotificationsSensors />
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
