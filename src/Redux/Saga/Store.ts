import {logger} from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import {call, takeEvery} from 'redux-saga/effects';
import createSagaMiddleware from '@redux-saga/core';
import homeReducer from '../Home/reducer';
import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const sagaMiddleware = createSagaMiddleware();

const getMiddlewares = (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
  return getDefaultMiddleware().concat(logger).concat(sagaMiddleware);
};

const Store = configureStore({
  reducer: {
    home: homeReducer,
  },
  middleware: getMiddlewares,
  // middleware: [sagaMiddleware, logger],
});

// function* getData(action: any){
// yield call(()=>action.getMusicFile())

// }

// function* watcherFunction(){
//   yield takeEvery("GET_DATA",getData)
// }

// sagaMiddleware.run(watcherFunction)
export default Store;
