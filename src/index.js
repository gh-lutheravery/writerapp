import Reactfrom 'react';
import ReactDOMfrom 'react-dom';
import { BrowserRouter }from 'react-router-dom';
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

