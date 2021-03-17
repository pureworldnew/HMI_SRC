import React from 'react';
import PresentationMenu from './PresentationMenu';




const PresentationContent = (props) => {
    let { data, history } = props;
    let rowNum = 4;
    let rows = [];
    // let rowCounter = 0;
    for (var i = 0; i < 12; i++) {
        let index = parseInt( (i / rowNum) );
        if(!rows[index]) rows[index] = [];
        rows[index].push(data[i] ? data[i] : null);
    }

    return (
        <div className="presentation-container">
            {
                rows.map((row, index) => {
                    return (
                        <div key={index} className="row">
                            {
                                row.map((preset, index) => {
                                    return (
                                        <div key={index + '-presetation'} className="col-md-3">
                                            <div className="presentation-item">
                                                {preset && <><div className="presentation-item-top">
                                                    <div>
                                                        <PresentationMenu slides={preset ? preset.slides : []} name={preset ? preset.name : ''} history={history} />
                                                    </div>
                                                </div>
                                                <div className="presentation-item-title">
                                                    {preset && preset.name}
                                                </div></>}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default PresentationContent;
