import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from "../Dashboard/Header";
import HorizontalTab from "../AccountManagement/Accounts/HorizontalTab";
import PresentationContent from './PresentationContent';




const Pagination = (props) => {
    let { page, setPage, noOfPages } = props;

    return (
        <div className="pagination">
            <div
                className="pagination__prev"
                onClick={() => {
                    if (page > 0) {
                        setPage(page - 1);
                    }
                }}
            >
                Previous
            </div>
            <div className="pagination__pages">
              <ul>
                {Array(noOfPages + 1)
                  .fill("")
                  .map((d, index) => (
                    <li
                      key={index + "sjlk"}
                      className={`pagination__page ${
                        index === page ? `pagination__page--active` : null
                      }`}
                      onClick={() => {
                        setPage(index);
                      }}
                    >
                      {index + 1}
                    </li>
                  ))}
              </ul>
            </div>
            <div
                className="pagination__next"
                onClick={() => {
                    if (page < noOfPages) {
                        setPage(page + 1);
                    }
                }}
            >
                Next
            </div>
        </div>
    );
}


const Presentations = (props) => {
    const { presentations, history } = props;
    const [activeTab, setActiveTab] = useState("Archived");
    const [page, setPage] = useState(0);
    const horizontalTabs = ['Archived', 'Draft'];
    const presentationNames = presentations[activeTab.toLowerCase()].map(presentation => {
        return {title: presentation.name};
    });
    const noOfPresentationsInPage = 12;
    const noOfPages = parseInt(presentations[activeTab.toLowerCase()].length / noOfPresentationsInPage);
    const dataInPage = presentations[activeTab.toLowerCase()].slice(
        page * noOfPresentationsInPage,
        page * noOfPresentationsInPage + 12
    );


    useEffect(() => {

    }, []);



    return (
        <div className="dashboard prst-container">
            <Header
              title="Presentations"
              subTitle=""
              type={"presentation"}
              presentationNames={presentationNames || []}
            />
            <HorizontalTab
              tabs={horizontalTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div style={{width: '100%'}}>
                <PresentationContent data={dataInPage} history={history} />
                <Pagination setPage={setPage} page={page} noOfPages={noOfPages} />
            </div>
        </div>
    )
};



function mapStateToProps(state) {
    let { presentations } = state;
    return {
        presentations
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: dispatch.presentations.getPresentations
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentations);
