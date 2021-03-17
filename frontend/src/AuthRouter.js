import React, { useRef, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import Fullscreen from "react-full-screen";
import Header from "./pages/Sections/Header";
import Sidebar from "./pages/Sections/Sidebar";
import Dashboard from "./pages/Dashboard";
import Revenue from "./pages/Revenue";
import RevenueInsights from "./pages/RevenueInsights";
import RevenueManagement from "./pages/RevenueManagement";
import RevenueChurn from "./pages/RevenueChurn";
import RevenueAr from "./pages/RevenueAr";
import Accounts from "./pages/AccountManagement/Accounts";
import TimeLine from './pages/AccountManagement/TimeLine';
import AccountManagers from "./pages/AccountManagement/AccountManagers";
import Heatmap from "./pages/AccountManagement/Heatmap";
import TaskList from "./pages/AccountManagement/TaskList";
import AccountManagement from "./pages/AccountManagement";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Presentation from "./pages/PresentationView";
import Document from "./pages/Document";
import Metrics from "./pages/Metrics";
import Connections from "./pages/Connections";
import Workflows from "./pages/Workflows";
import AlertsReports from "./pages/AlertsReports";
import { PRESENTATION as PRESENTATION_TYPE } from './store/constants';
import Admin from "./pages/Admin";
import Presentations from "./pages/Presentations";

const AuthRouter = props => {
  const [pageTitle] = React.useState("Insight");
  const [showMenu, setShowMenu] = React.useState(false);
  const [fullSceen, setFullSceen] = React.useState(false);
  let location = useLocation();
  const mainRef = useRef(null);
  const dispatch = useDispatch()

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
    if (location.pathname === "/presentation-view") {

      const keyCode = e.keyCode
      if (keyCode === 37 || keyCode === 38) {
        if (slectedSlide && slectedSlide.index > 0) {
          const newSlideID = slides[slectedSlide.index - 1].id;
          dispatch({
            type: PRESENTATION_TYPE.SELECT_SLIDE,
            payload: {
              id: newSlideID
            }
          })
        }
      } else if (keyCode === 39 || keyCode === 40) {
        if (slectedSlide && slectedSlide.index < (slides.length - 1)) {
          const newSlideID = slides[slectedSlide.index + 1].id;
          dispatch({
            type: PRESENTATION_TYPE.SELECT_SLIDE,
            payload: {
              id: newSlideID
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    mainRef.current.focus();
  }, [mainRef, location]);

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
      onChange={isFull => {
        setFullSceen(isFull)
        if (mainRef)
          mainRef.current.focus()
      }}
    >
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
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/revenue-management" component={Revenue} exact />
                <Route
                  path="/revenue-management/management"
                  component={RevenueManagement}
                  exact
                />
                <Route
                  path="/revenue-management/insights"
                  component={RevenueInsights}
                  exact
                />
                <Route
                  path="/revenue-management/churn"
                  component={RevenueChurn}
                  exact
                />
                <Route
                  path="/revenue-management/ar"
                  component={RevenueAr}
                  exact
                />
                <Route path="/account-management" component={AccountManagement} exact />
                <Route
                  path="/account-management/accounts"
                  component={Accounts}
                  exact
                />
                <Route
                  path="/account-management/account-managers"
                  component={AccountManagers}
                  exact
                />
                <Route
                  path="/account-management/heatmap"
                  component={Heatmap}
                  exact
                />
                <Route
                  path="/account-management/timeline"
                  component={TimeLine}
                  exact
                />
                <Route
                  path="/account-management/tasklist"
                  component={TaskList}
                  exact
                />
                <Route path="/presentations" component={Presentations} exact />
                <Route path="/account" component={Account} exact />
                <Route path="/product" component={Product} exact />
                <Route path="/presentation-view" exact>
                  <Presentation setFullSceen={setFullSceen} fullSceen={fullSceen} />
                </Route>
                <Route path="/documents" component={Document} exact />
                <Route path="/metrics" component={Metrics} exact />
                <Route path="/connections" component={Connections} exact />
                <Route path="/workflows" component={Workflows} exact />
                <Route path="/alerts" component={AlertsReports} exact />
                <Route path="/admin" component={Admin} exact />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    </Fullscreen>
  );
};

export default AuthRouter;
