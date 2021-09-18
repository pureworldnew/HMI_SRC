import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ChevronDown, XCircle } from 'react-feather';
import { deleteItemsLocalStorage } from '../../utils/Auth';
// import { useStateValue } from "../../StateContextProvider";
import {
  UncontrolledPopover,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';

const Header = ({
  setShowMenu,
  showMenu,
  history,
  fullSceen,
  setFullSceen
}) => {
  // const [{ user }] = useStateValue();
  const username = window.localStorage.getItem('username');

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const openPresentationMode = () => {
    history.push('/presentation-view');
  };

  const logout = () => {
    console.log('Here is logout');
    localStorage.clear();
    history.push('/login');
  };

  return fullSceen ? (
    <></>
  ) : (
    <header className="header">
      {window.location.pathname.includes('revenue-management/insights') ||
      window.location.pathname.includes('revenue-management/management') ||
      window.location.pathname.includes('revenue-management/churn') ||
      window.location.pathname.includes('revenue-management/ar') ||
      window.location.pathname.includes('account-management/accounts') ||
      window.location.pathname.includes(
        'account-management/account-managers'
      ) ||
      window.location.pathname.includes('account-management/heatmap') ||
      window.location.pathname.includes('account-management/timeline') ||
      window.location.pathname.includes('account-management/tasklist') ? (
        <button
          className="button presentation_btn"
          onClick={openPresentationMode}>
          <div className="button__svg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path
                  d="M-5.53678e-07 2.33333L-5.82819e-08 13.6667C-2.61386e-08 14.402 0.597982 15 1.33333 15L14.6667 15C15.402 15 16 14.402 16 13.6667L16 2.33333C16 1.59798 15.402 0.999999 14.6667 0.999999L1.33333 1C0.597981 1 -5.85821e-07 1.59798 -5.53678e-07 2.33333ZM14.6667 2.33333L14.6667 13.6667L1.33333 13.6673L1.33333 2.33333L14.6667 2.33333Z"
                  fill="white"
                />
                <path
                  d="M12.334 7.33337L12.334 8.66671C12.334 9.03471 12.6327 9.33337 13.0007 9.33337C13.3687 9.33337 13.6673 9.03471 13.6673 8.66671L13.6673 7.33337C13.6673 6.96537 13.3687 6.66671 13.0007 6.66671C12.6326 6.66671 12.334 6.96537 12.334 7.33337Z"
                  fill="white"
                />
                <path
                  d="M10.6665 10.6667L10.6665 9.33333C10.6665 8.96533 10.3679 8.66667 9.99988 8.66667C9.63188 8.66667 9.33321 8.96533 9.33321 9.33333L9.33321 9.72396L8.1379 8.52865C7.87748 8.26839 7.45561 8.26839 7.19519 8.52865C6.93494 8.78874 6.93494 9.21126 7.19519 9.47135L8.3905 10.6667L7.99988 10.6667C7.63188 10.6667 7.33321 10.9653 7.33321 11.3333C7.33321 11.7013 7.63188 12 7.99988 12L9.33321 12C10.0686 12 10.6665 11.402 10.6665 10.6667Z"
                  fill="white"
                />
                <path
                  d="M6.33268 6.99996C6.33268 6.82922 6.26774 6.65865 6.13737 6.5286L4.94206 5.33329L5.33268 5.33329C5.70068 5.33329 5.99935 5.03463 5.99935 4.66663C5.99935 4.29862 5.70068 3.99996 5.33268 3.99996L3.99935 3.99996C3.264 3.99996 2.66602 4.59794 2.66602 5.33329L2.66602 6.66663C2.66602 7.03463 2.96468 7.33329 3.33268 7.33329C3.70068 7.33329 3.99935 7.03463 3.99935 6.66663L3.99935 6.276L5.19466 7.47131C5.45508 7.73157 5.87695 7.73157 6.13737 7.47131C6.26774 7.34127 6.33268 7.17069 6.33268 6.99996Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    y="16"
                    width="16"
                    height="16"
                    transform="rotate(-90 0 16)"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span>Presentation View</span>
        </button>
      ) : (
        ''
      )}

      {/* Add a exit presentation button whene user on presentation mode */}
      {window.location.pathname.includes('/presentation-view') ? (
        <button
          style={{
            background: 'white',
            color: '#1C5DE1',
            border: '1px solid #1C5DE1',
            borderRadius: '4px'
          }}
          className="button"
          onClick={() => {
            history.goBack();
            setFullSceen(false);
          }}>
          <XCircle style={{ marginRight: '1rem' }} /> Exit Presentation View
        </button>
      ) : (
        ''
      )}

      <div className="header__reverse-wrapper">
        <div style={{ display: 'flex' }}>
          <figure className="header__image-container">
            <img src="" alt="" className="header__image" />
          </figure>

          <div className="header__dropdown">
            <button id="logout-popover" type="button">
              <ChevronDown />
            </button>

            <UncontrolledPopover
              trigger="legacy"
              placement="bottom"
              target="logout-popover">
              <PopoverBody>
                <div className="logout-popover-wrapper">
                  <div className="_editProfile">
                    <button style={{ marginBottom: '5px' }}>
                      Edit Profile
                    </button>
                  </div>
                  <div className="_logout">
                    <button onClick={() => logout()}>Log out</button>
                  </div>
                </div>
              </PopoverBody>
            </UncontrolledPopover>
          </div>
        </div>
        <div className="header__name-wrapper">
          <span className="header__user-name">{username && username}</span>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
