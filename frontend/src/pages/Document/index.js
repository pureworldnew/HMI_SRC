import React from 'react';
import T from 'i18n-react';

const Document = (props) => {
    return (
        <div className="container-fluid document" id="document">
          <h3 className="page-title"><T.span text="document.document" /></h3>
          <div className="document-container">
            <h1>document page</h1>
          </div>
        </div>
    )
};

export default Document;