import DOMReady from './utils/DOMReady';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import './style/reset.css';
import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';

DOMReady(() => {
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
});
