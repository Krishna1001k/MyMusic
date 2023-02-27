import React from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import Store from './src/Redux/Saga/Store';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <React.Fragment>
      <Provider store={Store}>
        <Routes />
      </Provider>
    </React.Fragment>
  );
};

export default App;
