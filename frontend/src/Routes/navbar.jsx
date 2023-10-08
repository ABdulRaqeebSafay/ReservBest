import {useState} from 'react';
import {Link } from "react-router-dom";
import { useUser } from './context';




const Navbar = () =>{
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { isLoggedIn } = useUser();
 
  const [selectedOption, setSelectedOption] = useState("English");
  const options = ['English', 'Dari', 'Pashto'];

  const toggleDropdown = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpenMenu(false);
  };
  

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
        <div className="langs mt-2">
                            
              <div className="custom-dropdown languages float-end">
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
              </div>


             
   {
    isLoggedIn ? <>
    
    <Link to="signup" className="text-decoration-none me-3 button btn-md">Sign Up</Link>
    <Link to="login" className="text-decoration-none me-3 button btn-md">Log In</Link>
    </> : null
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