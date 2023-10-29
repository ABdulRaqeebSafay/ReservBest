
import { useState, useEffect } from "react";
import { useLogged } from '../contexts/context';
import { Link } from "react-router-dom"; 
import { useUser } from "../contexts/userContext";
import { useTotalPrice } from "../contexts/totalPriceContext";
import { useGuestAmount } from "../contexts/guestAmountContext";
import AllDetails from "../Routes/allDetails";

const Hosts = ({ hotel_name, menuPrice, }) => {
  
  const [hostNumber, setHostNumber] = useState();
  const {guestAmount, setGuestAmount} = useGuestAmount(); 
  const [totalAmount,setTotalAmount] = useState(0);
  const { isLoggedIn } = useLogged();
  const {userData} = useUser();
  const {totalPrice,setTotalPrice} = useTotalPrice();




  useEffect(() => {

  setTotalPrice(guestAmount * menuPrice);
    console.log(userData)
    const total = hostNumber * menuPrice;
    const charge = (total * 7) / 100;
    setTotalAmount(total + charge);
  
  }, [totalPrice,guestAmount, menuPrice]);
    

  return (
    <>
      <div className="mt-5 px-5 sticky-top d-flex justify-content-between">
        <label htmlFor="" className="price my-3">
          {menuPrice} Afghani Per Person
        </label>
        <input
          type="number"
          onChange={(e) => setGuestAmount(e.target.value)}
          className=""
          placeholder="Number of hosts e.g: 500"
        />
        <br />
        <h4 className="price">
        <h4 className="price">
       Total: {totalPrice} {totalPrice === "" ? "" : "Afghani"}
</h4>

        </h4>
        <Link to={!isLoggedIn ? `/user/${userData._id}` : "/login"}className="reserv" >
          <AllDetails />
        </Link>
      </div>
    </>
  );
};

export default Hosts;
