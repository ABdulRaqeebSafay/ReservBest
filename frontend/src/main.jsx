import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './app.css';
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CombinedProvider } from './contexts/combinedContext.jsx'; // Import the combined context

ReactDOM.render(
  <CombinedProvider>
    <App />
  </CombinedProvider>,
  document.getElementById('root')
);
