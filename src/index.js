import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap.css'
import { Popup } from './Popup';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <Popup />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

