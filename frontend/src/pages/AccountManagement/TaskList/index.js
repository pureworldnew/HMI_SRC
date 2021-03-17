import React, { useState } from 'react';
import Header from '../../Dashboard/Header';
import StatCard from '../../Dashboard/StatCard';
import HorizontalTab from '../AccountManagers/HorizontalTab';
import TaskListToday from './TaskListToday';
import TaskListTomorrow from './TaskListTomorrow';
import TaskListExpiring from './TaskListExpiring';
import TaskListCompleted from './TaskListCompleted';
import CreateTaskModal from './CreateTask';

const data = {
  managedRevenue: 25,
  managedRevenuePrev: 22,
  logins: 84,
  loginsPrev: 88,
  productEngagement: 91,
  productEngagementPrev: 74,
  featureEngagement: '3/5',
  featureEngagementPrev: '2/5'
};

const TaskList = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [openModal, setOpenModal] = useState(false);
  const createNewTask = (event) => {
    setOpenModal(!openModal);
  };

  const getActiveTabContent = () => {
    switch (activeTab) {
      case 'Today':
        return (
          <div className="taskls-container">
            <TaskListToday />
          </div>
        );
      case 'Tomorrow':
        return (
          <div className="taskls-container">
            <TaskListTomorrow />
          </div>
        );
      case 'Expiring in next 7 days':
        return (
          <div className="taskls-container">
            <TaskListExpiring />
          </div>
        );
      case 'Completed':
        return (
          <div className="taskls-container">
            <TaskListCompleted />
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="dashboard task-list">
      <Header
        title="Account Management"
        subTitle="Task List"
        type={'account-management-tasklist'}
        createTask={createNewTask}
      />
      <div className="annual-recurring-revenue">
        <div className="revenue-insights__statsGrid">
          <StatCard
            title="Actions to complete today"
            page={'task-list'}
            reduceToMillion={true}
            main={data.managedRevenue}
            bottom={data.managedRevenuePrev}
            grid={1}
          />
          <StatCard
            title="Logins"
            page={'task-list'}
            main={data.logins}
            bottom={data.loginsPrev}
            grid={2}
          />
          <StatCard
            title="Product Engagement"
            page={'task-list'}
            main={data.productEngagement}
            bottom={data.productEngagementPrev}
            unit="percentage"
            grid={3}
          />
          <StatCard
            title="Feature Engagement"
            page={'task-list'}
            main={data.featureEngagement}
            bottom={data.featureEngagementPrev}
            grid={4}
          />
        </div>
      </div>

      <HorizontalTab
        tabs={['Today', 'Tomorrow', 'Expiring in next 7 days', 'Completed']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {getActiveTabContent()}
      {<CreateTaskModal open={openModal} toggle={createNewTask} />}
    </div>
  );
};

export default TaskList;
