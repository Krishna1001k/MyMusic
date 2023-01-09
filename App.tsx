import React from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import Store from './src/Redux/Saga/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
};

export default App;
