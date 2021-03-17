import React from 'react';
import T from 'i18n-react';

const Metrics = (props) => {
    return (
        <div className="container-fluid metrics" id="metrics">
          <h3 className="page-title"><T.span text="metrics.metrics" /></h3>
          <div className="metrics-container">
            <h1>metrics page</h1>
          </div>
        </div>
    )

};

export default Metrics;