import React from 'react';



const SummaryCharts = (props) => {
    let colStyle = {
        height: "140px"
    };
    let rowStyle = {
        minHeight: "200px",
        margin: "0"
    };

    return (
        <>
            <div className="row" style={rowStyle}>
                <div className="col-md-4" style={colStyle}>

                </div>
                <div className="col-md-4" style={colStyle}>

                </div>
                <div className="col-md-4" style={colStyle}>

                </div>
            </div>
            <div className="row" style={rowStyle}>
                <div className="col-md-4" style={colStyle}>

                </div>
                <div className="col-md-4" style={colStyle}>

                </div>
                <div className="col-md-4" style={colStyle}>

                </div>
            </div>
        </>
    );
};
export default SummaryCharts;
