import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import index from './modules/index';
import rootSaga from './sagas/index';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

export const store = configureStore({
  devTools: false,
  middleware: middlewares,
  reducer: index
});

sagaMiddleware.run(rootSaga);
