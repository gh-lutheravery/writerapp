import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import { MemoryRouter } from './node_modules/react-router-dom';
import App from './App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});
