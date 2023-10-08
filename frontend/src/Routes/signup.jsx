

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
     
     axios.post("http://localhost:5000/signup",
     { userName:values.name, 
      userPhone:values.phone, 
      userEmail:values.email, 
      userPassword:values.password })

     .then(response => {
      console.log("THE API RESPONSE :" + response);
      setData(response.data);
      if(response.data !== "The email is not valid"){
        if(response.data !== "The email is already registered"){
          console.log("the" + response.data + "register in db");
          navigate("/login")
        }
        else{
          console.log("the email is a real email but already registered");
          setData("the email is already registered")
        }
      }
      else{
        console.log("the is not  a real email");
        setData("this is email not exist!!!")
      }
      })
     .catch(e=> {
       console.log("error", e.message)
      setData("please enter a valid email")
     }
      )
      
        
    }
    

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
