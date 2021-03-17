import React from "react";
import T from 'i18n-react';

class Stats extends React.Component {
  render() {
    return (
      <div className="container-fluid admin" id="stats">
        <h3 className="page-title"><T.span text="dashboard.dashboard" /></h3>
        <div className="admin-container">
          <h1>admin page</h1>
        </div>
      </div>
    );
  }
}
export default Stats;
