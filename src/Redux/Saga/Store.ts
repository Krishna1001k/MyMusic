import {logger} from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import homeReducer from '../Home/reducer';

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: {
    home: homeReducer,
  },
  middleware: [sagaMiddleware, logger],
});

// sagaMiddleware.run()
export default Store;
