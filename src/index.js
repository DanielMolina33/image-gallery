import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/global.css'
import App from './routes/App';

const app = document.querySelector('#app');

ReactDOM.render(
  <App/>,
  app
);