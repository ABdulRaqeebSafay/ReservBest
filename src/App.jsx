import React from 'react';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';

import Navbar from './Routes/navbar';
import Contact from './Routes/contact';
import Hotels from './Routes/hotels';
import Home from './Routes/home';
import Signup from './Routes/signup';
import Login from './Routes/login';
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  return (
  <div className="bg-dark text-light">
    <BrowserRouter>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Hotels" element={<Hotels />} />
        <Route path="Contact" element={<Contact />} />
      </Routes>
      
    </BrowserRouter>


  </div>
  );
};

export default App;


            