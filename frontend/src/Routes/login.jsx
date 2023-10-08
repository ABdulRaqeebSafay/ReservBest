

import { useNavigate,Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'
import {useState} from 'react'
import axios from "axios";
import { useUser } from './context';






const Login = () =>{
  
  const [data, setData] = useState();
  const { isLoggedIn, setIsLoggedIn } = useUser();

    let navigate = useNavigate();

    let schema = yup.object( {
       
       email:yup.string().email('please enter a valid email').required('email is required field *'),
       
       password:yup.string().min(4).max(32).required('password is required field *')
     })
     
     const onSubmit = () => {
     
      axios.post("http://localhost:5000/login", { userEmail: values.email, userPassword: values.password })
        .then((response) => {
          setData(response.data);
          if (response.data === "success") {
            setIsLoggedIn(false);
            navigate("/hotels");
          }
        })
        .catch((e) => console.log(e.message));
    };
    
    

const {values,touched ,handleChange,handleSubmit,errors} = useFormik({
  initialValues:{
    email:'',
    password:''
  },
  validationSchema:schema,
  onSubmit,
});



    return(
         <>
                   
              
                 <div className=" register signup row align-items-center ">
                 <img className="col-lg-8 d-none d-sm-none d-lg-block signup" src="./photo5.jpg" />


                    <form className="text-center col-lg-3 col-md-7 col-sm mx-2">

                            
                       <h1 className="text-center mt-1 mb-5 welcome">LogIn Today ...!</h1>
           
                      <div className="form-group">
                         <input type="email" onChange={handleChange} placeholder="Enter you email" value={values.email} id="email" className="register-inputes" /><br />
                             {data == "email is not exist" ? <small className="text-danger">{data}</small> : errors.email && touched.email &&  <small className="text-danger">{errors.email}</small>}
                      </div>

                      <div className="form-group">
                         <input type="password" onChange={handleChange} autoComplete="off" placeholder="Enter Your Password" value={values.password} id="password" className="register-inputes" /><br />
                          {data === "password is incorrect" ? <small className="text-danger">{data}</small> : errors.password && touched.password &&  <small className="text-danger">{errors.password}</small> }

                      </div>

                       <button onClick={handleSubmit} type="submit" className="button">LogIn </button>  
                       <div className="mt-2">
                        <span className="question">You haven not Account?</span>
                         <Link className="create-account" to="/signup">Create Account</Link></div> 
                    </form>
                  
            </div>  
         </>
    )
    
}        


export default Login;