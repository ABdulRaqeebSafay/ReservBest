
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Routes/navbar';
import Contact from './Routes/contact';
import Hotels from './Routes/hotels';
import Home from './Routes/home';
import Signup from './Routes/signup';
import Login from './Routes/login'
import AddHotel from './Routes/addHotel';
import BookingPage from './Routes/bookingPage';
import HotelAdminPanel from './hotelAdminPanel';
import UserDashboard from './details/userDashboard';
import {useUserRole} from './contexts/userRoleContext';
import ForgotPassword from './Routes/forgotPassword';


const App = () => {
  const {userRole} = useUserRole();
  

  return (
  <div className=" text-light">
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hotels" element={<Hotels />} />
         <Route path="/hotels/:hotel_name" element={<BookingPage />} /> 

        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path={`/user/:_id`} element={<UserDashboard />} />
        <Route path={`/addHotel/:_id`} element={<AddHotel />} />
        <Route path={`forgotPassword`} element={<ForgotPassword />} />
        <Route path="hotelAdminPanel/:_hotel_name" element={<HotelAdminPanel />} />
      </Routes>

    </BrowserRouter>


  </div>
  );
};

export default App;


            