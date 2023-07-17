import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker.js';
import './bootstrap.css'
import { Popup } from './Popup.js';
import { createRoot } from 'react-dom/client';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Popup />
  </BrowserRouter>
);

registerServiceWorker();

