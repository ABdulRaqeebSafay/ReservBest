import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import emailjs from '@emailjs/browser';

const ForgotPassword = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    user_email: yup.string().email("Please enter a valid email").required("Email is a required field"),
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/emailExist", { email: values.user_email });
      setIsLoading(false);console.log(response.data);

      if (response.data === "Email exists in the database") {
        
        setData("");
        try{
            emailjs.send('service_4n10yr7', 'template_89p0tjf', {
                user_email: values.user_email,  
                user_name: 'John Doe',  
                message: 'https://example.com/reset-password',  
              }, 'LW3r27bFaCZINQrEn');
              console.log('Reset password email sent successfully to' + values.user_email);
        } 
        catch(err){
            console.log(err.message);
        }

      } else {
        console.log('Email not found in the database');
        setData("Email not found");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error.message);
      setData("An error occurred. Please try again.");
    }
  };

  const { values, touched, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      user_email: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <>
      <div className="signup align-items-center">
        <form className="text-center auth mx-2">
          <h1 className="text-center mt-1 mb-2 welcome">Forgot Password</h1>
          <div className="form-group">
            <input
              type="email"
              onChange={handleChange}
              placeholder="Enter your user_email"
              value={values.user_email}
              id="user_email"
              className="register-inputes"
            />
            {data === "email not found" ? (
              <small className="text-danger">{data}</small>
            ) : errors.user_email && touched.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
