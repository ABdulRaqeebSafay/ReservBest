import React,{useState} from 'react';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Home from './home';
import Contact from './contact';
import Hotels from './hotels';


const Navbar = () =>{
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
  setIsOpen(!isOpen);
};
return(<div>

<div className={`d-flex d-lg-none  burger-menu ${isOpen ? '' : 'open'}`} onClick={toggleMenu}>
<div className="bar"></div>
<div className="bar"></div>
<div className="bar"></div>

  <div className={ `${isOpen ? 'menu-links' : 'menu-links opened'}`}>
    <Link className="sm-links" to="/">Home</Link>
    <Link className="sm-links" to="/hotels">Hotels</Link>
    <Link className="sm-links" to="/contact">Contact</Link>
  </div>

</div>
        <div className="langs">
                       
             <select className="d-flex ms-5 mb-3">
                <option value="">English</option>
                <option value="">Dari</option>
                <option value="">Pashto</option>
            </select>
            
                <Link to="signup" className=" me-3  btn btn-dark btn-outline-light btn-md" >Sign Up</Link>
                <Link to="login" className=" me-3  btn btn-dark btn-outline-light btn-md">Log In</Link>
        </div>  
        <div className="links">
            <Link to="/" className="d-none text-light d-lg-inline  me-3" >Home</Link>
            <Link to="hotels" className="d-none  text-light  d-lg-inline me-3" >Hotels</Link>
            <Link to="contact" className="d-none text-light d-lg-inline  me-5" > Contact</Link>
        </div>

         
</div>)
  


}

export default Navbar;