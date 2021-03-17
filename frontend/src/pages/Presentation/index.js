import React from 'react';
import { useSelector } from 'react-redux';
import { File, FileText, PlayCircle} from 'react-feather';

const Presentation = ({ setFullSceen }) => {
    const slidesSelector = (state)=> state.presentation.slides;
    const slectedSlideSelector = (state)=> state.presentation.slectedSlide;

    const slectedSlideId = useSelector(slectedSlideSelector);
    const slides = useSelector(slidesSelector);

    let slectedSlide;
    slides.forEach((slide, index) => { 
      if(slide.id === slectedSlideId) {
        slectedSlide = {slide, index};
      }
    });

    const presentMode = (e)=> {
      setFullSceen(true)
    }


    return (
      <div tabIndex="0" className="container-fluid presentation" id="presentation">
        <div className="presentation-site-header">
          <h1>Presentation View</h1>
          <div className="helperButGroup">
            <button className="button exportBut">
              +Export to PPTX <File  style={{ marginLeft: "1rem" }}/>
            </button>
            <button className="button exportBut">
              +Export to Google Slides <FileText  style={{ marginLeft: "1rem" }}/>
            </button>
            <button className="button" onClick={presentMode}>
              Present <PlayCircle  style={{ marginLeft: "1rem" }}/>
            </button>
          </div>
        </div>
        <div className="slideBox">
          {slectedSlide
            ? <h1>{slectedSlide.slide.content}</h1>
            : 'no slide selected'
          }
        </div>
      </div>
    )
};

export default Presentation;
