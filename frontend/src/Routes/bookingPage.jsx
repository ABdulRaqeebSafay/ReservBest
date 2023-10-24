import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ExtraMenu from '../details/extraMenu';
import SpecialMenu from '../details/specialMenu';
import NormalMenu from '../details/normalMenu';
import MenuGradeOne from '../details/menuGradeOne';
import MenuGradeTwo from '../details/menuGradeTwo';
import MenuGradeThree from '../details/menuGradeThree';
import Calendar from '../calendar';
import { useSelectedMenu } from '../details/menuContext';
import { useHotelDetail } from '../details/hotelContext';

const BookingPage = () => {
  const { hotel_name } = useParams();
  const {hotelDetail,setHotelDetail} = useHotelDetail();
  const {setSelectedMenu} = useSelectedMenu();

  const [currentMenu, setcurrentMenu] = useState(null);
  const hotels = [
    { label: 'Extra Special Menu', component: <ExtraMenu hotel_name={hotel_name} /> },
    { label: 'Special Menu', component: <SpecialMenu hotel_name={hotel_name} /> },
    { label: 'Normal Menu', component: <NormalMenu hotel_name={hotel_name} /> },
    { label: 'Menu Grade One', component: <MenuGradeOne hotel_name={hotel_name} /> },
    { label: 'Menu Grade Two', component: <MenuGradeTwo hotel_name={hotel_name} /> },
    { label: 'Menu Grade Three', component: <MenuGradeThree hotel_name={hotel_name} /> },
  ];

  const handleMenuChange = (menuLabel) => {
    // Log the selected menu label to the console
    setSelectedMenu(`Selected menu: ${menuLabel}`);
    setcurrentMenu(menuLabel);
  };
  useEffect(()=>{
  setHotelDetail(hotel_name);

  },[hotelDetail])

  return (
    <div className="booking-page">
      <h1 className="text-center text-danger" style={{ paddingTop: '100px' }}>
        Welcome to {hotel_name} Menu
      </h1>

      <Calendar />

      <div className="menus">
        {hotels.map((menu, index) => (
          <div className="row" key={index}>
            <div className="col">
              <label className="mx-5">
                <input
                  type="radio"
                  value={menu.label}
                  name="menu"
                  checked={currentMenu === menu.label}
                  onChange={() => handleMenuChange(menu.label)} // Call the event handler
                />
                <h2>{menu.label}</h2>
              </label>
              {currentMenu === menu.label ? menu.component : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
