
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
  const {isLoggedIn} = useLogged();
  const isButtonDisabled =
  guestAmount.guestAmount === "" || guestAmount.guestAmount === 0 ||
  selectedDate.selectedDate === null || selectedMenu.selectedMenu === null;



  const reservHotel = () => {
    
    if (!isLoggedIn 
    &&userData._id
    && userData.userName
    && userData.userEmail
    && userData.userPhone
    && hotelDetail.hotelDetail
    && selectedDate.selectedDate
    && dayStatus.dayStatus
    && selectedMenu.selectedMenu
    && guestAmount.guestAmount
    && totalPrice.totalPrice ) {
      axios
        .post('http://localhost:5000/reservationDetails', {
          userId: userData._id,
          userName: userData.userName,
          userEmail: userData.userEmail,
          userPhone: userData.userPhone,
          hotelName: hotelDetail.hotelDetail,
          reservedDate: selectedDate.selectedDate,
          reservedStatus: dayStatus.dayStatus,
          reservedMenu: selectedMenu.selectedMenu,
          reservedGuestsAmount: guestAmount.guestAmount,
          totalPrice: totalPrice.totalPrice,
        })
        .then(() => {
          
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
      <button className="reserv " disabled={isButtonDisabled}  onClick={reservHotel}>Reserve Hotel</button>
    </div>
  );
};

export default AllDetails;
