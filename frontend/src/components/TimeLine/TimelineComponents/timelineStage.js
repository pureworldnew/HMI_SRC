import React from 'react';
import StageStep from './stageStep';

const TimeLineStage = (props) => {
  let { data, height } = props;
  let stagesMap = [
    { prop: 'stage0', title: '' },
    { prop: 'stage1', title: 'Deal > 90% Close in Quarter' },
    { prop: 'stage2', title: 'Contract Signed' },
    { prop: 'stage3', title: 'Customer Onboarding' },
    { prop: 'stage4', title: 'QBR' },
    { prop: 'stage5', title: 'On-Site Exec Visit' },
    { prop: 'stage6', title: '91 Days Before Renewal' },
    { prop: 'stage7', title: 'Renewal' }
  ];

  return (
    <div className="stage-unit" style={{ height: `${height}px` }}>
      <div className="timeline-account-name">{data.name}</div>
      {stagesMap.map((stage, index) => {
        return (
          <StageStep
            key={`stage-${index}`}
            data={data.stages[stage.prop]}
            stage={index}
            title={stage.title}
            company={data.name}
          />
        );
      })}
    </div>
  );
};

export default TimeLineStage;
