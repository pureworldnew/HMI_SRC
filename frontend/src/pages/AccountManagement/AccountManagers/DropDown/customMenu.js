import React, { useState, forwardRef, Children } from 'react';
import { FormControl } from 'react-bootstrap';

const CustomMenu = forwardRef(
  (
    {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
      accountManager
    },
    ref
  ) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}>
        <div className="dropdown-menu-title">
          <h4>Account Manged by:</h4>
          <p>{accountManager}</p>
        </div>
        <FormControl
          autoFocus
          className="dropdown-menu-searchIcon"
          placeholder="Search accounts"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {Children.toArray(children).filter((child) => {
            return (
              !value ||
              child.props.value
                .toLowerCase()
                .startsWith(value.toLowerCase())
            );
          })}
        </ul>
      </div>
    );
  }
);
export default CustomMenu;
