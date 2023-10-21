// Hosts.js
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import {format} from 'date-fns';
import { useLogged } from '../details/context';
import { Link } from "react-router-dom"; 
import { useUser } from "./userContext";



const Hosts = ({ hotel_name, menuPrice, selectedOptions }) => { // Remove the default value
  selectedOptions = {...selectedOptions} || {};// Provide a default value
  const [hostNumber, setHostNumber] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const { isLoggedIn } = useLogged();
  const {userData,setUserData} = useUser();



  const formattedTotal = isNaN(hostNumber)
    ? ""
    : (hostNumber * menuPrice).toLocaleString();

  useEffect(() => {
    // Calculate total amount with 7% charge
    const total = hostNumber * menuPrice;
    const charge = (total * 7) / 100;
    setTotalAmount(total + charge);
  
  }, [hostNumber, menuPrice,selectedOptions]);
    

   const downloadPdf = async() => {
    if(!isLoggedIn){
  const doc = new jsPDF();
   doc.text(`Total: ${formattedTotal} Afghani`, 10, 10);
   doc.text(`7% Charge: ${(totalAmount - (hostNumber * menuPrice)).toFixed(2).toLocaleUpperCase()} Afghani`, 10, 20);

  let yPosition = 40;

  if (selectedOptions) {
    Object.keys(selectedOptions).forEach((day) => {
      const date = new Date(day);
      const formattedDate = format(date, 'yy/MM/dd'); // Format the date
      console.log(`Date: ${formattedDate}, Status: ${selectedOptions[day]}`);
       doc.text(`Date: ${formattedDate}, Status: ${selectedOptions[day]}`, 10, yPosition);
      yPosition += 10;
    });
  }

  doc.save("reservation.pdf");
}else{
  console.log('User is not logged in. PDF generation is not allowed.');
}
}
;

    

  return (
    <>
      <div className="mt-5 px-5 sticky-top d-flex justify-content-between">
        <label htmlFor="" className="price my-3">
          {menuPrice} Afghani Per Person
        </label>
        <input
          type="number"
          onChange={(e) => setHostNumber(e.target.value)}
          className=""
          placeholder="Number of hosts e.g: 500"
        />
        <br />
        <h4 className="price">
          Total: {formattedTotal} {formattedTotal === "" ? "" : "Afghani"}
        </h4>
        <Link to={!isLoggedIn ? `/user/${userData._id}` : "/login"}className="reserv" onClick={downloadPdf}>
          Reserve Now
        </Link>
      </div>
    </>
  );
};

export default Hosts;
