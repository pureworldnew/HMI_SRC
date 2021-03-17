import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { PRESENTATION as PRESENTATION_TYPE } from '../../store/constants';
import { useSelector, useDispatch } from 'react-redux';

const PresentSideBar = (props) => {
    let { slides, fullSceen, action } = props;

    const slidesSelector = (state)=> state.presentation.slides;
    const slectedSlideSelector = (state)=> state.presentation.slectedSlide;
    const slectedSlide = useSelector(slectedSlideSelector);
    const slidePreButClick = (id) => {
        action(id, 'selected');
    }


  return(
    fullSceen ? <></> :
    <div className={`main__presentationSideBar-container`}>
      <div className={`presentationSideBar`}>
        <button className="button editButton">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
          <path d="M11.5 15.9984H1.83337C0.822021 15.9984 0 15.1764 0 14.165V4.49841C0 3.48706 0.822021 2.66504 1.83337 2.66504H7.5C7.776 2.66504 8 2.88904 8 3.16504C8 3.44104 7.776 3.66504 7.5 3.66504H1.83337C1.37402 3.66504 1 4.03906 1 4.49841V14.165C1 14.6244 1.37402 14.9984 1.83337 14.9984H11.5C11.9594 14.9984 12.3334 14.6244 12.3334 14.165V8.49841C12.3334 8.22241 12.5574 7.99841 12.8334 7.99841C13.1094 7.99841 13.3334 8.2218 13.3334 8.49841V14.165C13.3334 15.1764 12.5114 15.9984 11.5 15.9984Z" fill="white"/>
          <path d="M5.84806 10.6507C5.71672 10.6507 5.58867 10.5987 5.49467 10.5041C5.37602 10.386 5.32536 10.216 5.35807 10.0526L5.82939 7.69534C5.84868 7.59805 5.89665 7.50931 5.96598 7.43997L12.8708 0.536041C13.5854 -0.17868 14.7481 -0.17868 15.4634 0.536041C15.8094 0.881989 16 1.34207 16 1.83206C16 2.32205 15.8094 2.78201 15.4627 3.12808L8.55876 10.0327C8.48942 10.1027 8.40007 10.1501 8.30339 10.1693L5.9467 10.6407C5.91398 10.6474 5.88066 10.6507 5.84806 10.6507ZM8.20536 9.67935H8.21208H8.20536ZM6.78007 8.04007L6.486 9.51334L7.95866 9.21866L14.756 2.42142C14.9134 2.26334 15 2.05472 15 1.83206C15 1.60941 14.9134 1.40067 14.756 1.24271C14.432 0.917999 13.9034 0.917999 13.5774 1.24271L6.78007 8.04007Z" fill="white"/>
          <path d="M14.1666 4.21753C14.0386 4.21753 13.9106 4.16882 13.8133 4.0708L11.9279 2.18481C11.7326 1.9895 11.7326 1.67285 11.9279 1.47754C12.1232 1.28223 12.4399 1.28223 12.6353 1.47754L14.5206 3.36353C14.7159 3.55884 14.7159 3.87549 14.5206 4.0708C14.4225 4.16821 14.2946 4.21753 14.1666 4.21753Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <span style={{marginLeft: "12px", paddingTop: "2px"}}>Edit Slides</span>

        </button>

        <Scrollbars autoHide={true} style={{ marginTop: 26 }}>
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


function mapStateToProps(state) {
    let { slides } = state;
    return {
        slides: slides.data
    };
}

function mapDispatchToProps(dispatch) {
    let { slides } = dispatch;
    return {
        action: slides.updateState
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PresentSideBar);
