import React from 'react';

const HorizontalTab = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="horizontalTab">
      <ul className="horizontalTab__wrapper">
        {tabs.map((tab) => (
          <li
            key={tab + 'tab'}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'tab tab--active' : 'tab'}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorizontalTab;
