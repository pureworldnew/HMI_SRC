import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { File, FileText, PlayCircle } from 'react-feather';
import Select from 'react-select';
import { connect } from 'react-redux';
import PresentationTempContentTemp from './PresentationTempContent'; // It should be presentatino content
import DropdownIndicator from './SelectHelpers/DropdownIndicator';
import selectStyles from './SelectHelpers/styles';
import exportPPTX from '../../utils/exportPPTX';
import ShareDialog from './Dialog';

const Presentation = (props) => {
  let { setFullSceen, fullSceen, slides, selected } = props;
  let [exportOption, setExportOption] = useState();
  let [openDialog, setOpenDialog] = useState(false);
  const selectOptions = [
    { value: 'exportPPTX', label: 'Export to PPTX' },
    { value: '[function name]', label: 'Export to Google Slides' }
  ];
  let slectedSlide = slides[parseInt(selected) - 1]
    ? slides[parseInt(selected) - 1]
    : null;
  const presentMode = (e) => {
    setFullSceen(true);
  };
  const handleSelectChange = (value) => {
    switch (value.value) {
      case 'exportPPTX':
        exportPPTX(slides);
        break;
      default:
    }
  };
  const onShareDialog = (event) => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      tabIndex="0"
      className="container-fluid presentation"
      id="presentation">
      {fullSceen ? (
        <></>
      ) : (
        <div className="presentation-site-header">
          <div className="presentation--view">Presentation View</div>
          <div className="helperButGroup">
            <Select
              styles={selectStyles()}
              components={{ DropdownIndicator }}
              isSearchable={false}
              options={selectOptions}
              placeholder="+ Export to"
              controlShouldRenderValue={false}
              onChange={handleSelectChange}
            />
            <button className="button exportBut" onClick={onShareDialog}>
              Share
              <div className="presentation--share"></div>
            </button>
            <button
              className="button exportBut exportBut--present"
              onClick={presentMode}>
              Present <PlayCircle style={{ marginLeft: '1rem' }} />
            </button>
          </div>
        </div>
      )}

      <ShareDialog open={openDialog} handleClose={closeDialog} />

      <div className="slideBox">
        {slectedSlide ? (
          <div>
            <div className="slideTitle">{slectedSlide.title}</div>

            <div className="slideContent">
              {/* {slectedSlide.slide.content} */}
              <PresentationTempContentTemp fullSceen={fullSceen} />
            </div>
          </div>
        ) : (
          'no slide selected'
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  let { slides } = state;
  return {
    slides: slides.data,
    selected: slides.selected
  };
}

export default connect(mapStateToProps)(Presentation);
