import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './CSS/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoginProvider } from './Component/LoginContext/LoginContext';
import SnackBarProvider from './Component/SnackBar/SnackBarProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <SnackBarProvider>
          <App />
        </SnackBarProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
