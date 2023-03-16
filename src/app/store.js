import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { errorToast, successToast } from "~component/core/toasts";
import persistedReducer from "./rootReducer";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(errorToast)
      .concat(successToast)
      .concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
