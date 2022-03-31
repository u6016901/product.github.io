import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/bariol_regular-webfont.woff';
import './fonts/bariol_regular_italic-webfont.woff';
import './fonts/bariol_thin_italic-webfont.woff';
import './fonts/bariol_thin-webfont.woff';
import './fonts/bariol_light-webfont.woff';
import './fonts/bariol_light_italic-webfont.woff';
import {BrowserRouter} from "react-router-dom"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// ReactDOM.render(WHAT TO SHOW, WHERE TO SHOW IT)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
