
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
  // const clientId =  "99218630393-c3lfdprqk0q2q51iukrk3b1rs2nrsgi2.apps.googleusercontent.com";
  // useEffect(() => {
  //   // Load the Google API client library
  //   window.google.accounts.id.initialize({
  //     client_id: '99218630393-95duu8ntir9bv86hdrh5l0lttv7srsab.apps.googleusercontent.com',

  //     callback: handleSignInCallback, // Define your callback function
  //   });
  // }, []);
  
  // const handleSignInClick = () => {
  //   // Trigger the Google Sign-In
  //   window.google.accounts.id.prompt();
  // };
  
  // const handleSignInCallback = (response) => {
  //   if (response.error) {
  //     console.error('Google Sign-In error:', response.error);
  //   } else {
  //     // Handle successful sign-in here
  //     console.log('User signed in:', response);
  //   }
  // };
  

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



        <Route path="hotelAdminPanel" element={<HotelAdminPanel />} />
      </Routes>
      
{/* <button className="btn btn-primary"  onClick={handleSignInClick}>Sign In with Google</button> */}
    </BrowserRouter>


  </div>
  );
};

export default App;


            