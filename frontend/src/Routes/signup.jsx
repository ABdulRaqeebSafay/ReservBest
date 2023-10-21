

import { useNavigate,Link } from "react-router-dom";
import { useFormik } from "formik";
import {useState} from 'react'

import * as yup from 'yup'
import axios from "axios";





const Signup = () =>{


    let navigate = useNavigate();

    const [data,setData] = useState("");

    let schema = yup.object( {
       name:yup.string().required('name is required field *'),
       email:yup.string().email('please enter a valid email').required('email is required field *'),
       phone:yup.number().required().min(10),
       password:yup.string().min(4).max(32).required('password is required field *')
     })
     
     const onSubmit = () => {
      axios.post("http://localhost:5000/signup", {
        userName: values.name,
        userPhone: values.phone,
        userEmail: values.email,
        userPassword: values.password
      })
        .then((response) => {
          if (response.data === "The email is not valid") {
            console.log("This is not a valid email");
            setData("This email is not valid.");
          } else if (response.data === "The email is already registered") {
            console.log("This email is already registered.");
            setData("This email is already registered.");
          } else {
            console.log(`User ${values.email} is registered.`);
            setData(""); // Clear the error message
            navigate("/login"); // Navigate to the login page
          }
        })
        .catch((e) => {
          console.log("Error:", e.message);
          setData("Please enter a valid email");
        });
    };
    

const {values,touched ,handleChange,handleSubmit,errors} = useFormik({
  initialValues:{
    name:'',
    phone:'',
    email:'',
    password:''
  },
  validationSchema:schema,
  onSubmit,
});



    return(
         <>
        
                  <div className="register signup row align-items-center">
                  <img className="col-lg-8 d-none d-sm-none d-lg-block signup" src="./photo5.jpg" />

                    <form className="text-center col-lg-3 col-md col-sm mx-2" >
                       <h1 className="text-center mt-1 mb-5 welcome">Sign Up Today ...!</h1>
                       
                      <div className="form-group text-center">
                        <input value={values.name} onChange={handleChange} autoFocus placeholder="Enter your name"   type="text" id="name" className="  register-inputes" /><br />
                        {errors.name && touched.name &&  <small className="text-danger">{errors.name}</small> }
                      </div >
                     
                      <div className="form-group">
            
                         <input type="text" onChange={handleChange} placeholder="Enter Your Phone" value={values.phone} id="phone" className="register-inputes" /><br />
                      {errors.phone && touched.phone &&  <small className="text-danger">{errors.phone}</small> }
                      </div>
                      <div className="form-group">
                        
                         <input type="email" onChange={handleChange} placeholder="Enter your email" value={values.email} id="email" className="register-inputes" /><br />
                        { data !== "" ? <small className="text-danger">{data}</small> : errors.email && touched.email &&  <small className="text-danger">{errors.email}</small> }
                      </div>

                       <div className="form-group">
                        
                        <input value={values.password} onChange={handleChange} placeholder="Enter your password"  type="password"  id="password" className="register-inputes" /><br />
                        {errors.password && touched.password  &&  <small className="text-danger">{errors.password}</small> }

                      </div>
                     
                            <input
                              type="button"
                              onClick={handleSubmit} 
                              className="button"
                              value="Register"
                            />
                       <div className="mt-2">
                        <span className="question">You already registered?</span>
                         <Link className="create-account" to="/login" >Log In</Link></div> 
                    </form>
                  
            </div>  
         </>
    )
    
}        

export default Signup;
