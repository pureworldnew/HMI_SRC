import React from "react";

import UnAvailableToolTip from '../../Components/TooltipComponents/UnAvailableTooltipComponent';

const HorizontalTab = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="horizontalTab">
      <ul className="horizontalTab__wrapper">
        {tabs.map(tab => {
          if (tab == 'Growth' || tab == 'Unit Economics' || tab == 'Feature Engagement') {
            return (
              <UnAvailableToolTip title="Not available in beta!">
                <li
                  key={tab + "tab"}
                  className={activeTab === tab ? "tab tab--active link--disabled" : "tab link--disabled"}
                >
                  {tab}
                </li>
              </UnAvailableToolTip>
            )
          } else {
            return (
                <li
                  key={tab + "tab"}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? "tab tab--active" : "tab"}
                >
                  {tab}
                </li>
            )
          }
        })}
      </ul>
    </div>
  );
};

export default HorizontalTab;
