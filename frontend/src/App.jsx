
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import Navbar from './Routes/navbar';
import Contact from './Routes/contact';
import Hotels from './Routes/hotels';
import Home from './Routes/home';
import Signup from './Routes/signup';
import Login from './Routes/login'
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Google from './Routes/google'



import BookingPage from './Routes/bookingPage';
import HotelAdminPanel from './hotelAdminPanel';
import UserDashboard from './details/userDashboard';


const App = () => {

  return (
  <div className=" text-light">
    
    <BrowserRouter>
        {/* <GoogleOAuthProvider clientId={clientId}>
        <Google />
        </GoogleOAuthProvider> */}
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hotels" element={<Hotels />} />
         <Route path="/hotels/:hotel_name" element={<BookingPage />} /> 

        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/user/:_id" element={<UserDashboard />} />



        <Route path="hotelAdminPanel/:_hotel_name" element={<HotelAdminPanel />} />
      </Routes>
      
{/* <button className="btn btn-primary"  onClick={handleSignInClick}>Sign In with Google</button> */}
    </BrowserRouter>


  </div>
  );
};

export default App;


            