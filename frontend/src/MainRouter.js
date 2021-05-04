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
import Revenue from './pages/Revenue';
import RevenueInsights from './pages/RevenueInsights';
import RevenueManagement from './pages/RevenueManagement';
import RevenueChurn from './pages/RevenueChurn';
import RevenueAr from './pages/RevenueAr';
import Accounts from './pages/AccountManagement/Accounts';
import AccountManagers from './pages/AccountManagement/AccountManagers';
import Heatmap from './pages/AccountManagement/Heatmap';
import TimeLine from './pages/AccountManagement/TimeLine';
import TaskList from './pages/AccountManagement/TaskList';
import AccountManagement from './pages/AccountManagement';
import Account from './pages/Account';
import Product from './pages/Product';
import Presentation from './pages/PresentationView';
import Document from './pages/Document';
import Metrics from './pages/Metrics';
import Connections from './pages/Connections';
import Workflows from './pages/Workflows';
import Presentations from './pages/Presentations';
import Admin from './pages/Admin';
import AlertsReports from './pages/AlertsReports';
import store from './store';
import Sensors from './pages/Sensors';
import Actions from './pages/Actions';
import Notifications from './pages/Notifications';

const MainRouter = (props) => {
  const [pageTitle] = React.useState('Insight');
  const [showMenu, setShowMenu] = React.useState(false);
  const [fullSceen, setFullSceen] = React.useState(false);
  const [roleId, setRoleId] = React.useState(0);

  let location = useLocation();
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  store.dispatch.presentations.getPresentations();

  const slidesSelector = (state) => state.presentation.slides;
  const slectedSlideSelector = (state) => state.presentation.slectedSlide;

  const slectedSlideId = useSelector(slectedSlideSelector);
  const slides = useSelector(slidesSelector);

  let slectedSlide;
  slides.forEach((slide, index) => {
    if (slide.id === slectedSlideId) {
      slectedSlide = { slide, index };
    }
  });

  const handelSlide = (e) => {
    if (location.pathname === '/presentation-view') {
      const keyCode = e.keyCode;
      if (keyCode === 37 || keyCode === 38) {
        if (slectedSlide && slectedSlide.index > 0) {
          const newSlideID = slides[slectedSlide.index - 1].id;
          dispatch({
            type: PRESENTATION_TYPE.SELECT_SLIDE,
            payload: {
              id: newSlideID
            }
          });
        }
      } else if (keyCode === 39 || keyCode === 40) {
        if (slectedSlide && slectedSlide.index < slides.length - 1) {
          const newSlideID = slides[slectedSlide.index + 1].id;
          dispatch({
            type: PRESENTATION_TYPE.SELECT_SLIDE,
            payload: {
              id: newSlideID
            }
          });
        }
      }
    }
  };

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
      <div tabIndex="0" ref={mainRef} onKeyDown={handelSlide}>
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

                <Route path="/overview" component={AccountManagement} exact />
                <Route path="/overview/accounts" component={Accounts} />
                <Route
                  path="/overview/account-managers"
                  component={AccountManagers}
                />
                <Route path="/overview/heatmap" component={Heatmap} />
                <Route path="/overview/timeline" component={TimeLine} />
                <Route path="/overview/tasklist" component={TaskList} />

                <Route path="/revenue-management" component={Revenue} exact />
                <Route
                  path="/revenue-management/insights"
                  component={RevenueInsights}
                />
                <Route
                  path="/revenue-management/management"
                  component={RevenueManagement}
                />
                <Route
                  path="/revenue-management/churn"
                  component={RevenueChurn}
                />
                <Route path="/revenue-management/ar" component={RevenueAr} />

                <Route
                  path="/account-management"
                  component={AccountManagement}
                  exact
                />
                <Route
                  path="/account-management/accounts"
                  component={Accounts}
                />
                <Route
                  path="/account-management/account-managers"
                  component={AccountManagers}
                />
                <Route path="/account-management/heatmap" component={Heatmap} />
                <Route
                  path="/account-management/timeline"
                  component={TimeLine}
                />
                <Route
                  path="/account-management/tasklist"
                  component={TaskList}
                />

                <Route path="/presentations" component={Presentations} />
                <Route path="/presentation-view">
                  <Presentation
                    setFullSceen={setFullSceen}
                    fullSceen={fullSceen}
                  />
                </Route>

                <Route path="/account" component={Account} />
                <Route path="/product" component={Product} />
                <Route path="/documents" component={Document} />
                <Route path="/metrics" component={Metrics} />
                <Route path="/connections" component={Connections} />
                <Route path="/workflows" component={Workflows} />

                <Route path="/sensors" component={Sensors} />
                <Route path="/actions" component={Actions} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/alerts" component={AlertsReports} exact />
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
