import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './AppRouter';
import { StateProvider, initialState, reducer } from './StateContextProvider';

class HmiApp extends React.Component {
  componentDidMount() {
    // localStorage.setItem('contractStatus', 'ACV');
  }

  render() {
    return (
      <Provider store={store}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <AppRouter />
        </StateProvider>
      </Provider>
    );
  }
}

export default HmiApp;
