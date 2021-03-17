import React from 'react';

const TimeLineStagesLegend = (props) => {
  return (
    <div className="row">
      <div className="timeline-account-name"></div>
      <div className="timeline-stage-titles">
        <div>{'Deal > 90% Close in Quarter'}</div>
      </div>
      <div className="timeline-stage-titles">
        <div>{'Contract Signed'}</div>
      </div>
      <div className="timeline-stage-titles">
        <div>{'Customer Onboarding'}</div>
      </div>
      <div className="timeline-stage-titles">
        <div>{'QBR'}</div>
      </div>
      <div className="timeline-stage-titles">
        <div>{'On-Site Exec Visit'}</div>
      </div>
      <div className="timeline-stage-titles">
        <div>{'91 Days Before Renewal'}</div>
      </div>
      <div className="timeline-stage-titles">
        <div>{'Renewal'}</div>
      </div>
    </div>
  );
};

export default TimeLineStagesLegend;
