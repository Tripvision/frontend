import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { store } from './app/store'
import { CssBaseline } from '@mui/material';
import { ToggleColorMode } from './app/toggle-color-mode';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);

root.render(
  // <React.StrictMode>
    <CssBaseline>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToggleColorMode/>
        </PersistGate>
      </Provider>
    </CssBaseline>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
