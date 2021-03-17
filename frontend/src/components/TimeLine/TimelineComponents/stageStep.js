import React from 'react';
import { Tooltip, makeStyles } from '@material-ui/core';

let TooltipContent = (props) => {
  let { company, title, message } = props;

  return (
    <div className="custom-tooltip">
      <div className="tt-company">{company}</div>
      <p className="tt-title">{title}</p>
      <div className="tt-message">{message}</div>
    </div>
  );
};

let useStyles = makeStyles((theme) => ({
  customWidth: {
    padding: 24,
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'center',
    borderRadius: 8
  },
  arrow: {
    color: '#fff'
  }
}));

const StageStep = (props) => {
  let classes = useStyles();
  let { data, stage, title, company } = props;

  return (
    <div
      className={
        stage === 0 || stage === 7 ? 'timeline-stage-limits' : 'timeline-stage'
      }>
      <div className="step-container">
        <div
          className={`stage-step ${
            data.completed ? ' completed' : ' uncompleted'
          }`}></div>

        {stage >= 1 && (
          <Tooltip
            arrow
            classes={{ tooltip: classes.customWidth, arrow: classes.arrow }}
            placement="top"
            title={
              <TooltipContent
                company={company}
                title={title}
                message={`${
                  data.daysLeft >= 0 ? data.daysLeft : data.daysLeft * -1
                } ${
                  data.completed
                    ? data.daysLeft >= 0
                      ? 'days'
                      : 'days'
                    : 'days remaining'
                }`}
              />
            }>
            <div
              className={`stage-tooltip stage-step-icon ${
                data.completed
                  ? data.daysLeft >= 0
                    ? ' completed'
                    : ' overflow-deadline'
                  : ' uncompleted'
              }`}>
              <span>
                {data.completed
                  ? data.daysLeft >= 0
                    ? data.daysLeft
                    : data.daysLeft * -1
                  : ''}
              </span>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
export default StageStep;
