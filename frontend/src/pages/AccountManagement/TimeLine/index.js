import React, { useState } from 'react';
import Header from '../../Dashboard/Header';
import TimelineComponent from '../../../components/TimeLine';

const demoSteps = {
  stage0: { completed: true, daysLeft: 1 },
  stage1: { completed: true, daysLeft: 2 },
  stage2: { completed: true, daysLeft: 5 },
  stage3: { completed: false, daysLeft: 7 },
  stage4: { completed: false, daysLeft: 10 },
  stage5: { completed: false, daysLeft: 12 },
  stage6: { completed: false, daysLeft: 15 },
  stage7: { completed: false, daysLeft: 20 }
};
const demo1Steps = {
  stage0: { completed: true, daysLeft: 1 },
  stage1: { completed: true, daysLeft: 2 },
  stage2: { completed: true, daysLeft: 2 },
  stage3: { completed: true, daysLeft: 1 },
  stage4: { completed: true, daysLeft: 3 },
  stage5: { completed: false, daysLeft: 7 },
  stage6: { completed: false, daysLeft: 12 },
  stage7: { completed: false, daysLeft: 15 }
};
const demo2Steps = {
  stage0: { completed: true, daysLeft: 1 },
  stage1: { completed: true, daysLeft: 2 },
  stage2: { completed: true, daysLeft: 3 },
  stage3: { completed: true, daysLeft: 7 },
  stage4: { completed: true, daysLeft: 9 },
  stage5: { completed: true, daysLeft: 10 },
  stage6: { completed: false, daysLeft: 11 },
  stage7: { completed: false, daysLeft: 24 }
};

const demoData = [
  { name: 'Northwest Co', stages: demoSteps },
  { name: 'Balenciaga', stages: demo2Steps },
  { name: 'Apple', stages: demo1Steps },
  { name: 'Bose', stages: demo2Steps },
  { name: '45 RPM', stages: demoSteps },
  { name: 'Northwest Co', stages: demoSteps },
  { name: 'MS com', stages: demoSteps },
  { name: 'Octo Comp', stages: demo2Steps },
  { name: 'Space Co', stages: demoSteps },
  { name: 'Dapple', stages: demo1Steps },
  { name: 'Lx Co', stages: demo2Steps },
  { name: 'Northwest Co', stages: demoSteps },
  { name: 'Vox Fx', stages: demoSteps },
  { name: 'Bose', stages: demo1Steps },
  { name: 'MS-dev co', stages: demoSteps }
];

const TimeLine = (props) => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    focusedInput: null
  });
  let [accountsToShow, setAccountsToShow] = useState(demoData.slice(0, 10));
  const onSelectChange = (value) => {
    let dataLength = parseInt(value.value);
    setAccountsToShow(demoData.slice(0, dataLength));
  };

  return (
    <div className="dashboard timeline">
      <Header
        title="Account Management"
        subTitle="Timeline"
        date={date}
        setDate={setDate}
        type={'account-timeline'}
        onSelectChange={onSelectChange}
      />

      <div className="timeline-container">
        <TimelineComponent data={accountsToShow} />
      </div>
    </div>
  );
};

export default TimeLine;
