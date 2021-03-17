import React from 'react';

const PopupIcon = (props) => {
  return (
    <div
      className={`task-arrow task-arrow-${props.open ? 'down' : 'up'}`}></div>
  );
};
export default PopupIcon;
