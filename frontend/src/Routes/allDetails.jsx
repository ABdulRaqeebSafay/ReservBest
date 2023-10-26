import { useLogged } from "../details/context";
import { useUser } from "../details/userContext";
import {useSelectedDate} from '../details/calendarContext';
import { useSelectedMenu } from "../details/menuContext";
import { useGuestNumber } from "./guestAmountContext";
import jsPDF from "jspdf";
import { useHotelDetail } from "../details/hotelContext";
import { useDayStatus } from "../details/dayStatusContext";
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSignOut, faSpinner } from "@fortawesome/free-solid-svg-icons";

const AllDetails = () =>{
    
    const {userData,setUserData} = useUser();
    const {isLoggedIn,setIsLoggedIn} = useLogged(); 
    const {hotelDetail,setHotelDetail} = useHotelDetail();
    const {selectedDate,setSelectedDate} = useSelectedDate();
    const {selectedMenu,setSelectedMenu} = useSelectedMenu();
    const {guestAmount,setGuestAmount} = useGuestNumber();
    const {dayStatus,setDayStatus} = useDayStatus();
  const navigate = useNavigate(); 
      
  
  const handleLogOut = () =>{
    setUserData({});
    setIsLoggedIn(true);
    setHotelDetail();
    setSelectedDate();
    setSelectedMenu();
    setGuestAmount();
    setDayStatus();
    navigate("/login");
  }


    const downloadPdf = async() => {
    if(!isLoggedIn){
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
      <i style={{cursor:"pointer"}} className="float-end me-5 cursor-pointer" onClick={handleLogOut}><FontAwesomeIcon icon={faSignOut} size="xl" /></i>
      {/* <i className="float-end me-5" ><FontAwesomeIcon icon={faSpinner} transform="left-1"  spin/></i> */}
        <h1>All details</h1>
        <div className="mt-5">
            <h4>UserName: {userData.userName}</h4>
            <h5>{!isLoggedIn ? `Email:  ${userData.userEmail} ` : ""}</h5>
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

