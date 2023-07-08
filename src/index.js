import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import { BrowserRouter } from './node_modules/react-router-dom';
import registerServiceWorker from './registerServiceWorker.js';
import './bootstrap.css'
import { Popup } from './Popup.js';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <Popup />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

