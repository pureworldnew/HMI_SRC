import React from 'react';
import { Edit } from "react-feather";
import { Scrollbars } from 'react-custom-scrollbars';
import { PRESENTATION as PRESENTATION_TYPE } from '../../store/constants';
import { useSelector, useDispatch } from 'react-redux';
import FullScreen from 'react-full-screen';

const PresentSideBar = ({fullSceen}) => {
  const dispatch = useDispatch();
  const slidesSelector = (state)=> state.presentation.slides;
  const slectedSlideSelector = (state)=> state.presentation.slectedSlide;

  const slectedSlide = useSelector(slectedSlideSelector);
  const slides = useSelector(slidesSelector);
  // console.log('slides...', slides);
  const slidePreButClick = (id) => {
    dispatch({
      type: PRESENTATION_TYPE.SELECT_SLIDE,
      payload: {
        id: id
      }
    })
  }

  return(
    fullSceen ? <></> :
    <div className={`main__presentationSideBar-container`}>
      <div className={`presentationSideBar`}>
        <button className="button editButton">
          <Edit style={{ marginRight: "1rem" }} /> Edit Slides
        </button>

        <Scrollbars autoHide={true} style={{ marginTop: 60 }}>
          <div className="slide_list">
            {
              slides.map((slide, index)=>(
                <button 
                  key={index} 
                  className={
                    `slidePreviewBut ${slectedSlide === slide.id ? "slectedSlide": ''}`
                  }
                  onClick={()=> slidePreButClick(slide.id)}
                >
                  <div className="slidePreview">
                    <p>{slide.title}</p>
                  </div>
                </button>
              ))
            }
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default PresentSideBar;