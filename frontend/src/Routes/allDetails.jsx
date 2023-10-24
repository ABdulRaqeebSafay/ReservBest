import { useLogged } from "../details/context";
import { useUser } from "../details/userContext";
import {useSelectedDate} from '../details/calendarContext';
import { useSelectedMenu } from "../details/menuContext";
import { useGuestNumber } from "./guestAmountContext";
import jsPDF from "jspdf";
import { useHotelDetail } from "../details/hotelContext";
import { useDayStatus } from "../details/dayStatusContext";

const AllDetails = () =>{
    
    const {userData} = useUser();
    const {isLogged} = useLogged(); 
    const {hotelDetail} = useHotelDetail();
    const {selectedDate} = useSelectedDate();
    const {selectedMenu} = useSelectedMenu();
    const {guestAmount} = useGuestNumber();
    const {dayStatus} = useDayStatus();

    console.log(selectedDate);
    console.log(dayStatus)

    const downloadPdf = async() => {
    if(!isLogged){
      const doc = new jsPDF();
        doc.text(`Name: ${userData.userName}`, 10,10);
        doc.text(`Phone Number: ${userData.userPhone}`, 10,20);
        doc.text(`Hotel Name: ${hotelDetail}`, 10, 30)
        // doc.text(`Host Number: ${guestAmount.hostAmount}`, 10, 50);
       doc.text(`Total: ${guestAmount} Afghani`, 10, 40);
       doc.text(`7 % charge: ${(guestAmount * 7) / 100} Afghani`, 10, 50);
       doc.text(`Selected Date: ${selectedDate}`, 10, 60);
       doc.text(`Status: ${dayStatus}`, 10, 70);
       doc.text(`Selected Menu: ${selectedMenu}`, 10, 80);


       
   
       doc.save("reservation.pdf");
      }
    else{
      console.log('User is not logged in. PDF generation is not allowed.');
    }
    }
    return (<div className="text-center">
        <h1>All details</h1>
        <div className="mt-5">
            <h4>UserName: {userData.userName}</h4>
            <h5>{!isLogged ? `Email:  ${userData.userEmail} ` : ""}</h5>
            <h6>Selected Date: {selectedDate}</h6>
            <h1>Status: {dayStatus}</h1>
 
            <h1>Selected Menu: {selectedMenu}</h1>
            <h4>Total: {guestAmount}</h4>
            <h4>7 percent charge: {(guestAmount * 7) / 100}</h4>
        </div>
        <button className="routes " onClick={downloadPdf}>Download Form</button>
    </div>)
}

export default AllDetails;

