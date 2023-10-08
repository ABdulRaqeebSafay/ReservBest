
import axios from "axios";
import {useState, useEffect} from "react";

const Hosts = ({hotel_name, menuPrice}) =>{
    const [hostNumber,setHostNumber] = useState();

 
    return(<>
   <div className="mt-5 px-5 sticky-top d-flex justify-content-between">
    <label htmlFor="" className="price my-3">  {menuPrice} Afghani Per Person </label>
    <input type="number" onChange={(e) => setHostNumber(e.target.value)} className="" placeholder="e.g: 500" /><br />
    <h4 className="price">Total: {isNaN(hostNumber) ? "" : (hostNumber * menuPrice) + " Afghani "} </h4>
    <button className="reserv">Reserv Now</button>

</div>
    </>)
}
export default Hosts;