import React from 'react';
import {
  TimeLineStagesLegend,
  TimeLineStageContainer
} from './TimelineComponents';

class TimelineComponent extends React.Component {
  state = {
    height: 0
  };

  componentDidMount() {
    let containerHeight = document.getElementById('tm-container');
    this.setState({ height: containerHeight.clientHeight });
  }

  render() {
    return (
      <>
        <div id="tm-container" className="timeline-stages-container">
          <TimeLineStageContainer
            data={this.props.data}
            height={this.state.height}
          />
        </div>
        <TimeLineStagesLegend />
      </>
    );
  }
}

export default TimelineComponent;
