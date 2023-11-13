import { useUser } from "./contexts/userContext";
import Calendar from './calendar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const HotelAdminPanel = () => {
  const [filteredReservationDetails, setFilteredReservationDetails] = useState([]);
  const { userData } = useUser();
  const [allHotelsName, setAllHotelsName] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:5000";
  let id = 1;
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/hotels`)
      .then((response) => {
        const hotelNames = response.data.map((hotel) => hotel.hotelName);
        setAllHotelsName(hotelNames);
        setLoading(false); // Data has been loaded
      
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false); // Error occurred, set loading to false
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/getReservationDetails")
      .then((response) => {
        const desiredHotelName = userData.hotelName;
        const filteredDetails = response.data.filter((item) => item.hotelName === desiredHotelName);
        setFilteredReservationDetails(filteredDetails);
        // console.log(filteredReservationDetails);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userData.hotelName,filteredReservationDetails]);

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
            <h1 className="text-dark">
              The {userData.hotelName} is not in our database. Please contact the support team to add your hotel.
            </h1>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </>
  );
}

export default HotelAdminPanel;
