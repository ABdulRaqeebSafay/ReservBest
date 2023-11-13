import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'; 

import { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../contexts/userContext";
import { useUserRole } from "../contexts/userRoleContext";
import { useLogged } from "../contexts/context";
import { useHotelDetail } from "../contexts/hotelContext";
import { useSelectedMenu } from "../contexts/menuContext";
import { useSelectedDate } from "../contexts/calendarContext";
import { useGuestAmount } from "../contexts/guestAmountContext";
import { useDayStatus } from "../contexts/dayStatusContext";
import { useTotalPrice } from "../contexts/totalPriceContext";

const Login = () => {
  let navigate = useNavigate();
  const {userData,setUserData} = useUser();
  const { setUserRole} = useUserRole();
  const {setIsLoggedIn} = useLogged();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false); 

  const hotelDetail = useHotelDetail();
  const selectedMenu = useSelectedMenu();
  const guestAmount = useGuestAmount();
  const totalPrice = useTotalPrice();
  const selectedDate = useSelectedDate();
  const dayStatus = useDayStatus();
  const {isLoggedIn} = useLogged();

  const schema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Email is a required field'),
    password: yup.string().min(4).max(32).required('Password is a required field'),
    role: yup.string().required('Role is a required field'),
    hotelName: yup.string(), // Validation for hotel name (optional)
  });

  const onSubmit = () => {
    setIsLoading(true); // Set loading state to true

    const requestData = {
      userEmail: values.email,
      userPassword: values.password,
      role: values.role,
    };

    if (values.role === 'admin') {
      console.log('Admin login');
      requestData.hotelName = values.hotelName; // Include hotelName when the role is admin
    } else {
      console.log('User login');
    }

    axios.post("http://localhost:5000/login", requestData)
      .then((response) => {
        setIsLoading(false); // Set loading state to false
        console.log('Response Data:', response.data);

        if (response.data.message === "success") {
          setUserData(response.data.body);
          setIsLoggedIn(false);

          if (response.data.body.role === "user") {
            navigate(`/user/${response.data.body._id}`);
          } else {
            navigate(`/hotelAdminPanel/${response.data.body.hotelName}`);
          }
          setUserRole(response.data.body.role);
        } else {
          setData(response.data); // Set error message in data
        }
      })
      .catch((error) => {
        setIsLoading(false); // Set loading state to false
        console.log("An error occurred:", error);

        // setData(response.data.message); 
      });
  };

  useEffect(() => {
    try {
      if (!isLoggedIn && hotelDetail && hotelDetail.hotelDetail) {
        console.log("request sended successfully");
        axios
          .post('http://localhost:5000/reservationDetails', {
            userId: userData._id,
            userName: userData.userName,
            userEmail: userData.userEmail,
            userPhone: userData.userPhone,
            hotelName: hotelDetail.hotelDetail,
            reservedDate: selectedDate.selectedDate,
            reservedStatus: dayStatus.dayStatus,
            reservedMenu: selectedMenu.selectedMenu,
            reservedGuestsAmount: guestAmount.guestAmount,
            totalPrice: totalPrice.totalPrice,
          })
          .then(() => {
            // Handle success if needed
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("You have to log in first or hotelDetail is null.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }, [isLoggedIn,hotelDetail.hotelDetail]);
  

  const { values, touched, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'user',
      hotelName: '',
    },
    validationSchema: schema,
    onSubmit,
  });


  return (
    <>
      <div className="signup row align-items-center">
        <img className="col-lg-8 d-none d-sm-none d-lg-block picture" width="700" height="700" src="/Login-mockup.svg" />
        <form className="text-center auth col-lg-3 col-md-7 col-sm mx-2">
          <h1 className="text-center mt-1 mb-2 welcome">LogIn Now ...!</h1>
          <div className="form-group">
            <label htmlFor="role" style={{ color: "#c97f08" }}>Select Role:</label>
            <select
              value={values.role}
              onChange={handleChange}
              id="role"
              className="register-inputes"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {values.role === "admin" && (
            <div className="form-group">
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter Hotel Name"
                value={values.hotelName}
                id="hotelName"
                className="register-inputes"
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              value={values.email}
              id="email"
              className="register-inputes"
            />
            {data !== "Password is incorrect" ? (
            
            <div className="form-group">
             
             <small className="text-danger">{data}</small> 
             
            </div>
          ) : errors.email && touched.email && (
            <small className="text-danger">{errors.email}</small>
          )}
          </div>

          <div className="form-group">
            <input
              type="password"
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter Your Password"
              value={values.password}
              id="password"
              className="register-inputes"
            />
           
          </div>

          {data == "Password is incorrect" ? (
            <div className="form-group">
              <small className="text-danger">{data}</small>
            </div>
          ) : errors.password && touched.password && (
            <small className="text-danger">{errors.password}</small>
          )}

          <button onClick={handleSubmit}  type="submit" className="button" disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "LogIn"
            )}
          </button><br />
          <Link to="/forgotPassword">Forgot password?</Link>
          <div className="mt-2">
            <span className="question">You have no Account?</span>
            <Link className="create-account" to="/signup">Create Account</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login
