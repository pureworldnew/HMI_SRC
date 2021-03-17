import React from 'react';
import Grow from '@material-ui/core/Grow';

class CustomSearchRender extends React.Component {
  handleTextChange = (event) => {
    this.props.onSearch(event.target.value);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  };

  render() {
    const { searchText } = this.props;

    return (
      <Grow appear in={true} timeout={300}>
        <div ref={(el) => (this.rootRef = el)}>
          <div className="panel-toolbar">
            <label>
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchText || ''}
                onChange={this.handleTextChange}
              />
            </label>
          </div>
        </div>
      </Grow>
    );
  }
}

export default CustomSearchRender;
