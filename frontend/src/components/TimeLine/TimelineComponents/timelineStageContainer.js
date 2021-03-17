import React, { useState } from 'react';
import TimeLineStage from './timelineStage';

const TimeLineStageContainer = (props) => {
  let { data, height } = props;
  let stageHeight;
  if (height) stageHeight = parseInt(height / data.length);

  return (
    <>
      {stageHeight &&
        data.map((stage, index) => {
          return (
            <TimeLineStage
              key={`${index}-${stage.name}`}
              data={stage}
              height={stageHeight}
            />
          );
        })}
    </>
  );
};
export default TimeLineStageContainer;
