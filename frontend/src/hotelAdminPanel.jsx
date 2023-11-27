import { useUser } from "./contexts/userContext";
import Calendar from './calendar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import ExtraMenuForms from "./hotelsForm.jsx/ExtraMenuForms";
import PopUp from "./Routes/popUp";

const HotelAdminPanel = () => {
  const [filteredReservationDetails, setFilteredReservationDetails] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelDescription, setHotelDescription] = useState('');
  const [hotelImage, setHotelImage] = useState(null);
  const { userData } = useUser();
  const [allHotelsName, setAllHotelsName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailMessageSent,setEmailMessageSent] = useState("");
  const [popUpStyle,setPopUpStyle] = useState("popup");
  
  const baseUrl = "http://localhost:5000";
  let id = 1;
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/hotels`)
      .then((response) => {
        const hotelNames = response.data.map((hotel) => hotel.hotelName);
        setAllHotelsName(hotelNames);
        setLoading(false); 
        // setPopUpStyle("popup-show");
        setEmailMessageSent("Hotel Added Successfully");
        
      
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/getReservationDetails")
      .then((response) => {
        const desiredHotelName = userData.hotelName;
        const filteredDetails = response.data.filter((item) => item.hotelName === desiredHotelName);
        setFilteredReservationDetails(filteredDetails);
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userData.hotelName,filteredReservationDetails]);
  const addHotel = () => {
    const formData = new FormData();
    formData.append('hotelName', hotelName);
    formData.append('hotelLocation', hotelLocation);
    formData.append('hotelDescription', hotelDescription);
    formData.append('hotelImage', hotelImage); 
  
    axios.post(
      `${baseUrl}/addHotel`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then((response) => console.log("Hotel added successfully", response.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {loading ? (
        <div className="text-center" style={{ color: "#c97f08",marginTop:"40px" }}>
        <FontAwesomeIcon icon={faSpinner} spin size="5x" />
      </div>
      ) : (
        <>
          <h1 className="text-warning mt-5 pt-5 text-center">This is {userData.hotelName} Admin Panel </h1>
          {!allHotelsName.includes(userData.hotelName) ? (
             <div className="text-center">
             <h4 style={{color:"#c97f08"}}>Add Your Hotels Main Details</h4>
             <div className="mx-auto text-center">
         <input
             type="text"
             id="hotelName"
             className="menuForms p-1 w-25 mt-4"
             placeholder="add your hotel Name"
             onChange={(e) => setHotelName(e.target.value)}
             name="hotelName"
           /><br />
         <input 
         type="text"
          name="hotelLocation"
           className="menuForms p-1 w-25 mt-4"
            placeholder="add your hotel Location" 
            onChange={(e) =>setHotelLocation(e.target.value)} />
           <br />

     
         <input type="text"
         name="hotelDescription" 
         className="menuForms p-1 w-25  mt-4" 
         placeholder="add your hotel description" 
         onChange={(e) =>setHotelDescription(e.target.value)}/><br />

         <input type="file" className="text-left mt-4" onChange={(e) =>setHotelImage(e.target.files[0])} />
         </div>
         <button className="button w-25 text-center mt-4" onClick={addHotel}>
        {loading ? <FontAwesomeIcon icon="spinner" spin /> : "Add Hotel"}
      </button>

     </div>
          ) : (
            <>
            {/* <AddHotel /> */}
            <ExtraMenuForms />
            
              <Calendar />
              <div className="mx-2 user-details">
                <table className="table" style={{ color: "#c97f08" }}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Reserved Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Guest Numbers</th>
                      <th scope="col">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservationDetails.map((item) => (
                      <tr key={item._id}>
                        <th scope="row">{id++}</th>
                        <td>{item.userName}</td>
                        <td>{item.userEmail}</td>
                        <td>{new Date(item.reservedDate).toLocaleDateString('en-US')}</td>
                        
                        <td>
                          <span className={`badge ${item.reservedStatus === "book" ? "bg-success" : "bg-warning"}`}>
                            {item.reservedStatus}
                          </span>
                        </td>
                        <td>{item.userPhone}</td>
                        <td>{item.reservedGuestsAmount}</td>
                        <td>{item.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <PopUp emailMessageSent={emailMessageSent} popUpStyle={popUpStyle}/> */}
            </>
          )}
        </>
      )}
    </>
  );
}

export default HotelAdminPanel;
