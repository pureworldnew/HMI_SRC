import React from 'react';
import { withRouter } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';

const Header = ({ history, fullSceen, setFullSceen }) => {
  const username = window.localStorage.getItem('username');

  const logout = () => {
    console.log('Here is logout');
    localStorage.clear();
    history.push('/login');
  };

  return fullSceen ? (
    <></>
  ) : (
    <header className="header">
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
