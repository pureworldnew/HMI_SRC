import React, { useRef, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  withRouter
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fullscreen from 'react-full-screen';
import { Helmet } from 'react-helmet';
import jwt_decode from 'jwt-decode';
import { PRESENTATION as PRESENTATION_TYPE } from './store/constants';

// Pages
import Header from './pages/Sections/Header';
import Sidebar from './pages/Sections/Sidebar';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Sensors from './pages/Sensors';
import Notifications from './pages/Notifications';
import NotificationLists from './pages/NotificationLists';

const MainRouter = (props) => {
  const [pageTitle] = React.useState('Insight');
  const [showMenu, setShowMenu] = React.useState(false);
  const [fullSceen, setFullSceen] = React.useState(false);
  const [roleId, setRoleId] = React.useState(0);

  let location = useLocation();
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    mainRef.current.focus();
    let token = localStorage.getItem('access_token');
    const { exp } = jwt_decode(token);
    console.log('exp is ', exp);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      localStorage.clear();
      props.history.push('/login');
    }
    if (!localStorage.getItem('access_token')) props.history.push('/login');
    else setRoleId(localStorage.getItem('roleId'));
  }, [mainRef, location, props.history]);

  var mainClassName = '';
  if (location.pathname === '/presentation-view') {
    if (fullSceen) {
      mainClassName = 'main__headerForPresentationPlay';
    } else {
      mainClassName = 'main__headerForPresentation';
    }
  } else {
    mainClassName = 'main__headerwithcontent';
  }

  return (
    <Fullscreen
      enabled={fullSceen}
      onChange={(isFull) => {
        setFullSceen(isFull);
        if (mainRef) mainRef.current.focus();
        let presentaionContainer = mainRef.current.querySelector('.slideBox');
        if (presentaionContainer) {
          presentaionContainer.style.height = isFull ? '100vh' : null;
        }
      }}>
      <div tabIndex="0" ref={mainRef}>
        <div className="main">
          <Helmet>
            <title>{pageTitle}</title>
          </Helmet>
          <Sidebar
            fullSceen={fullSceen}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            setFullSceen={setFullSceen}
            roleId={roleId}
          />
          <div className={mainClassName}>
            <Header
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              fullSceen={fullSceen}
              setFullSceen={setFullSceen}
            />
            <main className="main__content">
              <Switch>
                <Redirect from="/" to="/dashboard" exact />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/sensors" component={Sensors} />
                <Route path="/notifications-create" component={Notifications} />
                <Route path="/notifications" component={NotificationLists} />
                <Route path="/admin" component={Admin} roleId={roleId} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    </Fullscreen>
  );
};

export default withRouter(MainRouter);
