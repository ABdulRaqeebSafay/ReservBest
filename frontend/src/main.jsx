import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import "./App.css"
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './Routes/context.jsx'



ReactDOM.render(
    <UserProvider>
      <App />
    </UserProvider>,
    document.getElementById('root')
  );
