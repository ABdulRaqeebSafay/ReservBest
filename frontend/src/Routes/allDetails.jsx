import React from 'react';
import axios from 'axios';
import { useUser } from "../contexts/userContext";
import { useSelectedMenu } from "../contexts/menuContext";
import { useTotalPrice } from "../contexts/totalPriceContext";
import { useHotelDetail } from "../contexts/hotelContext";
import { useGuestAmount } from '../contexts/guestAmountContext';
import { useSelectedDate } from '../contexts/calendarContext';
import { useDayStatus } from '../contexts/dayStatusContext';
import { useLogged } from '../contexts/context';

const AllDetails = () => {
  const { userData } = useUser();
  const hotelDetail = useHotelDetail();
  const selectedMenu = useSelectedMenu();
  const guestAmount = useGuestAmount();
  const totalPrice = useTotalPrice();
  const selectedDate = useSelectedDate();
  const dayStatus = useDayStatus();
  const {isLoggedIn,setIsLoggedIn} = useLogged();

  const reservHotel = () => {
    if (!isLoggedIn) {
      
      console.log("request sended now")
      axios
        .post('http://localhost:5000/reservationDetails', {
          userId: userData._id,
          userName: userData.userName,
          userEmail: userData.userEmail,
          hotelName: hotelDetail.hotelDetail,
          reservedDate: selectedDate.selectedDate,
          reservedStatus: dayStatus.dayStatus,
          reservedMenu: selectedMenu.selectedMenu,
          reservedGuestsAmount: guestAmount.guestAmount,
          totalPrice: totalPrice.totalPrice,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("You have to log in first.");
    }
  };

  return (
    <div>
      <button onClick={reservHotel}>Reserve Hotel</button>
    </div>
  );
};

export default AllDetails;
