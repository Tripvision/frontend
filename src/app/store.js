import { configureStore } from '@reduxjs/toolkit'
import logger from "redux-logger";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { errorToast, promiseToast } from '~component/core/toasts';
import persistedReducer from './rootReducer';

export const store = configureStore({
  reducer : persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    .concat(promiseToast)
    .concat(errorToast)
    .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',

})


