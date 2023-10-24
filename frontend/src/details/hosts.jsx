// Hosts.js
import { useState, useEffect } from "react";

import { useLogged } from '../details/context';
import { Link } from "react-router-dom"; 
import { useUser } from "./userContext";
import { useGuestNumber } from "../Routes/guestAmountContext";


const Hosts = ({ hotel_name, menuPrice, }) => { // Remove the default value
  
  const [hostNumber, setHostNumber] = useState();
  const [totalAmount,setTotalAmount] = useState(0);
  const { isLoggedIn } = useLogged();
  const {userData} = useUser();
  const {guestAmount,setGuestAmount} = useGuestNumber();




  useEffect(() => {
  setGuestAmount(hostNumber * menuPrice);
    // Calculate total amount with 7% charge
    const total = hostNumber * menuPrice;
    const charge = (total * 7) / 100;
    setTotalAmount(total + charge);
  
  }, [hostNumber, menuPrice]);
    

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
        <h4 className="price">
  Total: {guestAmount} {guestAmount === "" ? "" : "Afghani"}
</h4>

        </h4>
        <Link to={!isLoggedIn ? `/user/${userData._id}` : "/login"}className="reserv" >
          Reserve Now
        </Link>
      </div>
    </>
  );
};

export default Hosts;
