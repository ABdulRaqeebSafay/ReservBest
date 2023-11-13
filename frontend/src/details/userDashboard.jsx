import { useLogged } from "../contexts/context";
import { useUser } from "../contexts/userContext";


import {useEffect,useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faCheck,faHotel,faPeopleGroup, faCalendar, faMoneyBill, faBars } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

const UserDashboard = () =>{
  const { userData  } = useUser();
  const { isLoggedIn  } = useLogged();
  

  
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [reservationIdToDelete, setReservationIdToDelete] = useState(null);


  const [filteredReservationDetails, setFilteredReservationDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const downloadPdf = async(userName, hotelName, totalPrice, year,month,day, reservedMenu, reservedStatus, reservedGuestsAmount) => {
    if (!isLoggedIn) {
        const doc = new jsPDF();

        doc.setFillColor("#ccc");
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

        doc.setTextColor(0, 0, 0);

        doc.setFontSize(12);

        const totalBorderWidth = 1; 
        const border1Width = totalBorderWidth / 2; 
        const border2Width = totalBorderWidth / 2.5; 
        const padding = 10;
        const repaidAmount = 70000;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
      
        doc.setDrawColor("#c97f08"); 
        doc.setLineWidth(border1Width);
        doc.rect(padding, padding, pageWidth - 2 * padding, pageHeight - 2 * padding);
        
        doc.setDrawColor("#c97f08"); 
        doc.setLineWidth(border2Width);
        doc.rect(padding + border1Width, padding + border1Width, pageWidth - 2 * (padding + border1Width), pageHeight - 2 * (padding + border1Width));
        

        doc.setFontSize(14);
        doc.text(` ${hotelName} Final Reservation Paper`, 50, 30);

        
        doc.setFontSize(12);
        doc.setLineHeightFactor(1.5);
        doc.text(`To Finalize Your Reservation Please Take This Form Along side 1,000 (1 Thousand)
USD Dollors or Afghani 70,000 (70 thousand Afghani) To the ${hotelName}.
        `,20,50);
        doc.setLineHeightFactor(1);

        doc.text(`Reservation Details: `, 20, 70);
        doc.text(`Name: ${userName}`, 20, 80);
        doc.text(`Date: ${year}-${month}-${day}`, 20, 90);
        doc.text(`Guests Amount : ${reservedGuestsAmount}`, 20, 100);

        doc.text(`Selcted Menu : ${reservedMenu}`, 20, 110);
        doc.text(`Menu Total: ${totalPrice}`, 20, 120);
        doc.text(`7% Hotel Service Charge: ${(totalPrice * 7) / 100} Afghani`, 20, 130);
        doc.text(`Total Amount: ${totalPrice + (totalPrice * 7) / 100} Afghani`, 20, 140);
        doc.text(`Prepaid Amount: ${repaidAmount} Afghani`, 20, 150);
        doc.text(`Remainder Amount: ${(totalPrice + (totalPrice * 7 ) / 100) - repaidAmount} Afghani`, 20, 160);
        doc.setLineHeightFactor(1.5);
        doc.setTextColor("#c97f08");
        doc.text(`Note: Your Event is during the Night Starting From 5 pm till 1 pm Sign The PDF
and Pay the Prepaid Amount at the Hotel Management mentioned in Above. You
can pay the Remainder Amount during your Event Night.`,20,170);

doc.setLineHeightFactor(1);

      doc.text(`Enjoy Your Event and Take Care.`,20,190);
      doc.text(`ReservBest Team.`,20,200);
      doc.text(`___________`,110,270);
      doc.setFontSize(10);
      doc.text(`Signature Place`,110,275);
      

        doc.save("reservation.pdf");
    } else {
        console.log('User is not logged in. PDF generation is not allowed.');
    }
}


    const cancelReserv = (reservationId) => {
    
      setReservationIdToDelete(reservationId);
      setShowConfirmationDialog(true);
      

    };
    const deleteReservation = () => {
      if (reservationIdToDelete) {
        
        axios.delete('http://localhost:5000/deleteReservedHotel', { data: { _id: reservationIdToDelete } })
          .then(() => {
            
            setFilteredReservationDetails(filteredReservationDetails.filter(detail => detail._id !== reservationIdToDelete));
          })
          .catch(error => {
            
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
           setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    });

    return (
      <div className="" style={{paddingTop:"130px"}}>
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
              <div key={index} className="card col-lg-4  col-sm-6 col-md-4 text-center" style={{color:"#c97f08",border:"1px solid #c97f08"}}>
                <div className="card-title fw-bold " style={{fontSize:"18px"}}>{detail.userName}</div>
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
                <button onClick={() => downloadPdf(detail.userName,detail.hotelName,detail.totalPrice,year,month,day,detail.reservedMenu,detail.reservedStatus,detail.reservedGuestsAmount)} className="btn btn-primary mx-3">
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
              <img src="/not-hotel-booked.svg" width="400"/>
                <p>are you Interested to book some hotels? </p>
                <Link to="/hotels" className="buttons">Hotels</Link>
              </div>
              }
            
           
        
</div>)
}

export default UserDashboard;

