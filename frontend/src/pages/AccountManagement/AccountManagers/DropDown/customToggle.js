import React, { forwardRef } from 'react';
import ChevronIcon from '../Table/ChevronIcon';

const CustomToggle = forwardRef(
  ({ children, onClick, managerAccounts, withToggle }, ref) => {
    const onClickToggle = (e) => {
      e.preventDefault();
      onClick(e);
    };

    return (
      <div
        className="managers-container-toggle"
        ref={ref}
        onClick={onClickToggle}>
        {children}
        {withToggle && <ChevronIcon />}
      </div>
    );
  }
);

export default CustomToggle;
