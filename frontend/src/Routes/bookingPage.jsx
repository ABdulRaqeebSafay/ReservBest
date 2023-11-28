import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ExtraMenu from '../details/extraMenu';
import SpecialMenu from '../details/specialMenu';
import NormalMenu from '../details/normalMenu';
import MenuGradeOne from '../details/menuGradeOne';
import MenuGradeTwo from '../details/menuGradeTwo';
import MenuGradeThree from '../details/menuGradeThree';
import Calendar from '../calendar';
import { useSelectedMenu } from '../contexts/menuContext';
import { useHotelDetail } from '../contexts/hotelContext';
import { useTotalPrice } from '../contexts/totalPriceContext';
import{useGuestAmount} from '../contexts/guestAmountContext'

const BookingPage = () => {
  const { hotel_name } = useParams();
  const { totalPrice, setTotalPrice } = useTotalPrice();
  const {guestAmount,setGuestAmount} = useGuestAmount();
  const { setSelectedMenu } = useSelectedMenu();
  const {hotelDetail,setHotelDetail} = useHotelDetail();

  const [currentMenu, setCurrentMenu] = useState(null);
  const [selectedMenuOption, setSelectedMenuOption] = useState(null);

  const hotels = [
    { label: 'Extra Special Menu', component: <ExtraMenu hotel_name={hotel_name} /> },
    { label: 'Special Menu', component: <SpecialMenu hotel_name={hotel_name} /> },
    { label: 'Normal Menu', component: <NormalMenu hotel_name={hotel_name} /> },
    { label: 'Menu Grade One', component: <MenuGradeOne hotel_name={hotel_name} /> },
    { label: 'Menu Grade Two', component: <MenuGradeTwo hotel_name={hotel_name} /> },
    { label: 'Menu Grade Three', component: <MenuGradeThree hotel_name={hotel_name} /> },
  ];

  const handleMenuChange = (menuLabel) => {
    setSelectedMenuOption(menuLabel);
    setTotalPrice(0);
    setGuestAmount(0);
  };

  const handleShowMenu = () => {
    setSelectedMenu(selectedMenuOption);
    setCurrentMenu(selectedMenuOption);
  };
  useEffect(() =>{
    setHotelDetail(hotel_name)
  },[hotelDetail])

  return (
    <div className="booking-page">
      <h1 className="text-center " style={{color:"#c97f08", paddingTop: '100px' }}>
        Welcome to {hotel_name} Menu
      </h1>
    <div className="row">
      <div className="col-lg-4 col-md3 col-12">
        <p className="ms-5 mt-5 text-dark text-center" style={{fontSize:"20px"}}>1- Please select a night for your event:</p>
        <Calendar />
      </div>
      <div className="menus col-lg-7 col-md-9 col">
      <p className="me-5 mt-5 text-center text-dark" style={{fontSize:"20px"}}>2- Please Select a Menu for your Guests:  </p>
        <div className="row justify-content-center align-items-center">
          <div className=" ms-5 col text-center">
          <span className="text-center" style={{fontSize:"14px"}}>Select A Menu:  </span>
              <select value={selectedMenuOption} onChange={(e) => handleMenuChange(e.target.value)}>
                <option value="">Select</option>
                {hotels.map((menu, index) => (
                  <option key={index} value={menu.label}>
                    {menu.label}
                  </option>
                ))}
              </select>
            
          </div>
          <div className="col">
            <button className="btn" style={{background:"#c97f08",color:"white "}} onClick={handleShowMenu}>Show Menu</button>
          </div>
        </div>
        {currentMenu ? (
          <div className="row foods">
            <div className="col">{hotels.find((menu) => menu.label === currentMenu)?.component}</div>
          </div>
        ) : null}
      </div>
    </div>

      
    </div>
  );
};

export default BookingPage;
