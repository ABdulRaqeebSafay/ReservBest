import { useLogged } from "../contexts/context";
import { useUser } from "../contexts/userContext";
import {useSelectedDate} from '../contexts/calendarContext';
import { useSelectedMenu } from "../contexts/menuContext";
import { useTotalPrice } from "../contexts/totalPriceContext";
import { useHotelDetail } from "../contexts/hotelContext";
import { useDayStatus } from "../contexts/dayStatusContext";


import {useEffect,useState} from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSignOut, faSpinner,faCheck,faHotel,faPeopleGroup, faCalendar, faMoneyBill, faBars } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

const UserDashboard = () =>{
  const { userData,      setUserData      } = useUser();
  const { isLoggedIn,    setIsLoggedIn    } = useLogged();
  const { hotelDetail,   setHotelDetail   } = useHotelDetail();
  const { selectedDate,   setSelectedDate  } = useSelectedDate();
  const { selectedMenu,   setSelectedMenu  } = useSelectedMenu();
  const { totalPrice,     setTotalPrice    } = useTotalPrice();
  const { dayStatus,      setDayStatus    } = useDayStatus();
  
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [reservationIdToDelete, setReservationIdToDelete] = useState(null);


  const [filteredReservationDetails, setFilteredReservationDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for the spinner
  
  
    const downloadPdf = async(userName,hotelName,totalPrice,reservedDate,reservedMenu,reservedStatus,reservedGuestsAmount) => {
    if(!isLoggedIn){
      const doc = new jsPDF();
        doc.text(`Name: ${userName}`, 10,10);
        doc.text(`Hotel Name: ${hotelName}`, 10, 20)
        doc.text(`Hotel Name: ${reservedGuestsAmount}`, 10, 30)
        // doc.text(`Phone Number: ${userData.userPhone}`, 10,20);
       doc.text(`Total: ${totalPrice} Afghani`, 10, 40);
       doc.text(`7 % charge: ${(totalPrice * 7) / 100} Afghani`, 10, 50);
       doc.text(`Selected Date: ${reservedDate}`, 10, 60);
       doc.text(`Status: ${reservedStatus}`, 10, 70);
       doc.text(`Selected Menu: ${reservedMenu}`, 10, 80);

       doc.save("reservation.pdf");
      }
    else{
      console.log('User is not logged in. PDF generation is not allowed.');
    }
    }

    const cancelReserv = (reservationId) => {
      // Send a DELETE request to your API endpoint with the reservation ID
      
      setReservationIdToDelete(reservationId);
      setShowConfirmationDialog(true);
      

    };
    const deleteReservation = () => {
      if (reservationIdToDelete) {
        // Send a DELETE request to your API endpoint with the reservation ID
        axios.delete('http://localhost:5000/deleteReservedHotel', { data: { _id: reservationIdToDelete } })
          .then(response => {
            // Handle success, e.g., remove the reservation from the UI
            setFilteredReservationDetails(filteredReservationDetails.filter(detail => detail._id !== reservationIdToDelete));
          })
          .catch(error => {
            // Handle errors, e.g., show an error message
            console.error('Error deleting reservation:', error);
          });
  
        setShowConfirmationDialog(false);
      }
    };
    const closeConfirmationDialog = () => {
      setReservationIdToDelete(null);
      setShowConfirmationDialog(false);
    };
  
    
    useEffect(() => {
      axios.get("http://localhost:5000/getReservationDetails")
        .then((response) => {
          const desiredId = userData._id;
          const filteredDetails = response.data.filter((item) => item.userId === desiredId);
          setFilteredReservationDetails(filteredDetails);

          // setUserData(filteredDetails.userName)         
          // setHotelDetail(filteredDetails.hotelName)   
          // setSelectedDate(filteredDetails.reservedDate) 
          // setSelectedMenu(filteredDetails.reservedMenu) 
          // setTotalPrice(filteredDetails.totalPrice)   
          // setDayStatus(filteredDetails.reservedStatus)    
           setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, [userData._id]);

    return (
      <div className="" style={{paddingTop:"140px"}}>
          {showConfirmationDialog && (
        <div className="overlay">
          <div className="confirmation-dialog">
            <p>Are you sure you want to cancel the reservation?</p>
            <button onClick={closeConfirmationDialog}>No</button>
            <button onClick={deleteReservation}>Yes</button>
          </div>
        </div>
      )}
           {isLoading ? ( 
        <div className="text-center" style={{ color: "#c97f08" }}>
          <FontAwesomeIcon icon={faSpinner} spin size="5x" />
        </div>
      ) : filteredReservationDetails.length >  0  ? 
      <div className="row mt-4 align-items-center justify-content-center">  
          {filteredReservationDetails.map((detail, index) => {
             const reservedDate = new Date(detail.reservedDate);

             const year = reservedDate.getFullYear().toString().slice(-2);
             const month = (reservedDate.getMonth() + 1).toString().padStart(2, '0');
             const day = reservedDate.getDate().toString().padStart(2, '0');
            return (
              <div key={index} className="card col-lg-4  col-sm-6 col-md-4 text-center" style={{color:"#c97f08"}}>
                <div className="card-title">{detail.userName}</div>
                <div className="card-title">{detail.userEmail}</div>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCalendar} className="mx-2" />
                  <h5 className="card-title">{`${year}/${month}/${day}`}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheck}  className="mx-2"/>
                  <h5 className="card-title">{detail.reservedStatus}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faMoneyBill} className="mx-2" />
                  <h5 className="card-title">{detail.totalPrice}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faHotel}  className="mx-2"/>
                  <h5 className="card-title">{detail.hotelName}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faBars}  className="mx-2"/>
                  <h5 className="card-title">{detail.reservedMenu}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faPeopleGroup}  className="mx-2"/>
                  <h5 className="card-title">{detail.reservedGuestsAmount}</h5>
                </div>
                <button onClick={() => downloadPdf(detail.userName,detail.hotelName,detail.totalPrice,detail.reservedDate,detail.reservedMenu,detail.reservedStatus,detail.reservedGuestsAmount)} className="btn btn-primary mx-3">
                  Download Form
                </button>
                <button onClick={() => cancelReserv(detail._id)} className="btn btn-danger mx-3">
            cancel
          </button>
              </div>
            </div> 
            )
        })}

          </div>
              : <div className="text-center" style={{color:"#c97f08"}}>
              <h1 style={{color:"rgba(201, 127, 8,0.4)"}}>You have not any booked Hotel</h1>
                <p>are you Interested to book some hotels? </p>
                <Link to="/hotels" className="buttons">Hotels</Link>
              </div>
              }
            
           
        
</div>)
}

export default UserDashboard;

