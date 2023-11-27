import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from 'react';
import * as yup from 'yup';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import PopUp from "./popUp";

const Signup = () => {
  let navigate = useNavigate();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [emailMessageSent,setEmailMessageSent] = useState('');
  const [popup,setPopUp] = useState("popup");


  const schema = yup.object({
    name: yup.string().required('Name is a required field'),
    email: yup.string().email('Please enter a valid email').required('Email is a required field'),
    phone:yup.string().required().matches(/^\+93\d{9}$/, 'Phone number must start with +93 and be 12 characters long'),
    password: yup.string().min(4).max(32).required('Password is a required field'),
    role: yup.string().required('Role is a required field'),
    hotelName: yup.string().when('role', (role,schema) =>{
      if(role === 'admin')
       return schema.string().required()
       return schema;
    }),
  });
  

  const onSubmit = () => {
    setIsLoading(true); 

    const requestBody = {
      userName: values.name,
      userPhone: values.phone,
      userEmail: values.email,
      userPassword: values.password,
      role: values.role,
      hotelName: values.hotelName,
    };

    axios.post("http://localhost:5000/signup", requestBody)
    .then((response) => {
      setIsLoading(false);
      console.log(response.data);
      if (response.data === "User registered successfully" || response.data === "Admin registered successfully") {
        setPopUp("popup-show");
        setEmailMessageSent("Successful Registeration");
        setTimeout(() =>{
          navigate("/login");
        },3000)
      } else {
        setData(response.data);
      }
    })
    .catch((e) => {
      setIsLoading(false);
      console.log("Error:", e.message);
      setData("An error occurred. Please try again.");
    });
  }  

  
const { values, touched, handleChange, handleSubmit, errors } = useFormik({
  initialValues: {
    name: '',
    phone: '',
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
        <img className="col-lg-8 picture d-none d-sm-none d-lg-block " src="/Signup-mockup.svg" width="600" height="600" />
        <form className="text-center register col-lg-3 col-md col-sm mx-2 mt-5">
          <h1 className="text-center mt-1 mb-2 welcome">Sign Up Now ...!</h1>
          <div className="form-group text-center">
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
                  value={values.hotelName}
                  onChange={handleChange}
                  placeholder="Enter Hotel Name"
                  type="text"
                  id="hotelName"
                  className="register-inputes"
                />
                {data === "A hotel with the same name already exists" ? (
                  <small className="text-danger" style={{ fontSize: "12px" }}>
                    Hotel with the same name already exists
                  </small>
                ) : errors.hotelName && touched.hotelName && (
                  <small className="text-danger">{errors.hotelName}</small>
                )}
              </div>
            )}
            <input value={values.name} onChange={handleChange} autoFocus placeholder="Enter your name" type="text" id="name" className="register-inputes" /><br />
            {errors.name && touched.name && <small className="text-danger">{errors.name}</small>}
          </div>
          <div className="form-group">
            <input type="text" onChange={handleChange} placeholder="Enter Your Phone" value={values.phone} id="phone" className="register-inputes" /><br />
            {errors.phone && touched.phone && <small className="text-danger">{errors.phone}</small>}
          </div>
          <div className="form-group">
  <input
    type="email"
    onChange={handleChange}
    placeholder="Enter your email"
    value={values.email}
    id="email"
    className="register-inputes"
  />
  <br />
  {values.role === "user" && (
    <div>
      {data === "The email is already registered" && (
        <small className="text-danger">{data}</small>
      )}
      {data === "The email is not valid" && (
        <small className="text-danger">{data}</small>
      )}
      {errors.email && touched.email && (
        <small className="text-danger">{errors.email}</small>
      )}
    </div>
  )}
  {values.role === "admin" && (
    <div>
      {data === "A hotel with the same name already exists" && (
        <small className="text-danger">{data}</small>
      )}
      {data === "The email is not valid" && (
        <small className="text-danger">{data}</small>
      )}
      {errors.email && touched.email && (
        <small className="text-danger">{errors.email}</small>
      )}
    </div>
  )}
</div>

          <div className="form-group">
            <input value={values.password} onChange={handleChange} placeholder="Enter your password" type="password" id="password" className="register-inputes" /><br />
            {errors.password && touched.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <button onClick={handleSubmit}
           type="submit"
           className="button" disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Register"
            )}
          </button>
          <div className="mt-2">
            <span className="question">You already registered?</span>
            <Link className="create-account" to="/login">Log In</Link>
          </div>
        </form>
        <PopUp emailMessageSent={emailMessageSent} popUpStyle={popup}/>
      </div>
    </>
  );
}

export default Signup;
