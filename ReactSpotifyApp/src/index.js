import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { popper } from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


axios.defaults.withCredentials = true
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['X-CSRF-TOKEN'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MjUxODA0NCwianRpIjoiMjdlMTAzYjgtNTA0ZC00YmFiLWI5MWEtYzdhMzAzOWRhZjEyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNjcyNTE4MDQ0LCJleHAiOjE2NzI1MjE2NDR9.ZqRFF6MFQUvsXhcZQFJusP5y-O3PTnC0agiZfjhTIhU';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
