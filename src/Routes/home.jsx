import React,{usetate} from 'react';
import { Link } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Navbar from './navbar';

const Home = () =>{
    return(<div className="home-page">
        <img className="first-page-image" src="/photo1.jpg" alt="" />
    </div>)

}


export default Home;