
import * as yup from 'yup';
import {useRef, useState,useEffect} from 'react';
import { useFormik } from 'formik';
import emailjs from '@emailjs/browser'



const Contact = () =>{

    let form = useRef(null);
    const [emailMessageSent,setEmailMessageSent] = useState("");    
    const [popup,setPopup] = useState("");    

    let schema = yup.object( {
      user_name:yup.string().required('name is required field *').min(3,'name must be at least 3 number').max(10,'name is too longer'),
        user_email:yup.string().email('please enter a valid email').required('email is required field *'),
        message:yup.string().required("message is required field *")
      });
      const sendEmail = () => {
        emailjs
        .sendForm('service_4n10yr7', 'template_89p0tjf', form.current, 'LW3r27bFaCZINQrEn')
          .then(() => {
            setEmailMessageSent('The Message Sent Successfully..!');
            setPopup('popup-show');
            form.current.reset();
          })
          .catch(() => {
            setEmailMessageSent('Something Went Wrong..!');
            setPopup('popup-show');
          });
      };
      
    

      let {values,handleChange,errors,handleSubmit,touched,resetForm} = useFormik({
        initialValues: {
          user_name: "",
          user_email: "",
          message: "", // Add this line
        },
        
          validationSchema:schema,
          onSubmit: () => {
            sendEmail();
     
          },
          
        })
        useEffect(() => {
          setTimeout(() => {
              if(emailMessageSent !== 'The Message Sent Successfully..!'){
                  setPopup('popup');
              }else{
                  
                  resetForm();
                  setPopup('popup');
              }
          }, 5000);
          
        }, [popup]);
        

    return(
        <>
         <div className="contact-page row "  style={{paddingTop:"80px"}}>
      <img src="/contact.svg" className="col picture" width="600" height="600"/>

      <div className="contact-content col">
        <h2 className="text-center">Contact Us</h2>
         <p className="text-center">Have questions or feedback? We would love to hear from you.</p>

         <form className="contact-form needs-validation" ref={form} onSubmit={handleSubmit} noValidate>
  <div className="mb-3">
    <label htmlFor="user_name" className="form-label">Name</label>
    <input
      onChange={handleChange}
      value={values.user_name}
      id="user_name"
      type="text"
      className={`form-control ${errors.user_name && touched.user_name ? 'is-invalid' : ''}`}
      placeholder="Name"
      required
    />
 
  </div>

  <div className="mb-3">
    <label htmlFor="user_email" className="form-label">Email</label>
    <input
      onChange={handleChange}
      value={values.user_email}
      id="user_email"
      type="email"
      className={`form-control ${errors.user_email && touched.user_email ? 'is-invalid' : ''}`}
      placeholder="Email"
      required
    />
   
  </div>

  <div className="mb-3">
    <label htmlFor="message" className="form-label">Message</label>
    <textarea
      name="message"
      onChange={handleChange}
      value={values.message}
      className={`form-control ${errors.message && touched.message ? 'is-invalid' : ''}`}
      placeholder="Message"
      rows="4"
      required
    ></textarea>
 
  </div>

  <button type="submit" className="">Submit</button>
</form>

            <div className={`${popup} 
               ${emailMessageSent === 'The Message Sent Successfully..!' ?
              "bg-success text-light " : "text-light bg-danger"} `}>
               <p>{emailMessageSent}</p>
            </div>
      </div>
    </div>
 
        </>
    )
}

export default Contact;