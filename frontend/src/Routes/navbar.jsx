import {useState} from 'react';
import {Link,useNavigate } from "react-router-dom";
import {  faUser,faSignOut} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogged } from "../contexts/context";
import { useUser } from "../contexts/userContext";
import {useSelectedDate} from '../contexts/calendarContext';
import { useSelectedMenu } from "../contexts/menuContext";
import { useTotalPrice } from "../contexts/totalPriceContext";
import { useHotelDetail } from "../contexts/hotelContext";
import { useDayStatus } from "../contexts/dayStatusContext";
import { useUserRole } from '../contexts/userRoleContext';
import Logo from './logo.jsx'





const Navbar = () =>{
 
  const [isOpen, setIsOpen] = useState(true);
  const {userRole} = useUserRole();
  // const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { userData, setUserData } = useUser();
  const { isLoggedIn, setIsLoggedIn } = useLogged();
  const {setHotelDetail } = useHotelDetail();
  const { setSelectedDate } = useSelectedDate();
  const { setSelectedMenu } = useSelectedMenu();
  const { setTotalPrice } = useTotalPrice();
  const {setDayStatus } = useDayStatus();
 
  // const [ setSelectedOption] = useState("English");
  // const options = ['English', 'Dari', 'Pashto'];
  const navigate = useNavigate();




const handleLogOut = () =>{
    setUserData({});
    setIsLoggedIn(true);
    setHotelDetail();
    setSelectedDate();
    setSelectedMenu();
    setTotalPrice();
    setDayStatus();
    navigate("/login");
  }

  // const toggleDropdown = () => {
  //   setIsOpenMenu(!isOpenMenu);
  // };

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setIsOpenMenu(false);
  // };
  
  
  

const toggleMenu = () => {
  setIsOpen(!isOpen);
};
return(<div className="navbar-page">

<div className={`d-flex d-lg-none  burger-menu ${isOpen ? '' : 'open'}`} onClick={toggleMenu}>
<div className="bar"></div>
<div className="bar"></div>
<div className="bar"></div>

  <div className={ `${isOpen ? 'menu-links closed' : 'menu-links opened '}`}>
    <Link className="sm-links" to="/">Home</Link>
    <Link className="sm-links" to="/hotels">Hotels</Link>
    <Link className="sm-links" to="/contact">Contact</Link>
  </div>

</div>
            {/* <Logo /> */}
        <div className="langs mt-2">
                            
              {/* <div className="custom-dropdown languages float-end">
                <div className="dropdown-header" onClick={toggleDropdown}>
                 <p style={{fontSize:"18px",display:"inline"}}>{selectedOption}</p>
                  <i className={`arrow ms-4 ${isOpenMenu ? 'open-menu' : 'd-none'}`} > &#9650;</i>
                  <i className={`arrow ms-4 ${isOpenMenu ? 'd-none' : 'open-menu'}`} > &#9660;</i>
                </div>
                {isOpenMenu && (
                  <ul className="options">
                    {options.map((option, index) => (
                      <li key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div> */}

              {!isLoggedIn ? <>
                {userRole === 'user' ?
                <Link style={{color:"#c97f08",fontSize:"24px",    marginRight:"30px"}}to={`/user/${userData._id}`}> 
                <FontAwesomeIcon icon={faUser} />
                  </Link> : 
                  <Link style={{color:"#c97f08",fontSize:"24px",    marginRight:"30px"}}to={`/hotelAdminPanel/${userData.hotelName}`}> 
                  <FontAwesomeIcon icon={faUser} />
                  </Link> }
                  
                    <i style={{ cursor: "pointer", color: "#c97f08",fontSize:"20px", marginRight:"30px" }}  onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faSignOut} size="xl" />
                  </i>  </>: <>
                 
                  <Link to="signup" className="text-decoration-none me-3 button btn-md">Sign Up</Link>
                  <Link to="login" className="text-decoration-none me-3 button btn-md">Log In</Link> 
                  </> 
                
   }

  
   
   </div>  
        <div className="links">
            <Link to="/" className="routes d-none d-lg-inline  me-3" >Home</Link>
            <Link to="hotels" className="routes d-none   d-lg-inline me-3" >Hotels</Link>

            <Link to="contact" className= "routes d-none d-lg-inline  me-5" > Contact</Link>
            

        </div>
        
              

         
</div>)
  


}

export default Navbar;