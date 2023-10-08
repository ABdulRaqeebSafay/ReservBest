// import{useRef} from 'react';
// import emailjs from '@emailjs/browser'
import * as yup from 'yup';
// import { Form } from 'formik';
import { useFormik } from 'formik';


const Contact = () =>{

    

    // const sendEmail = (e) => {
    //   e.preventDefault();
  
    //   emailjs.sendForm('service_26umlrt', 'template_89p0tjf', form.current, 'LW3r27bFaCZINQrEn')
    //     .then((result) => {
    //         console.log(result.text);
    //         console.log('message sent')
    //     }, (error) => {
    //         console.log(error.text);
    //     });
    // };
    let schema = yup.object( {
        user_email:yup.string().email('please enter a valid email').required('email is required field *'),
        user_name:yup.string().required('name is required field *').min(3,'name must be at least 3 number').max(10,'name is too longer'),
      });

      let {values,handleChange,errors,handleSubmit,touched} = useFormik({
        initialValues:{
          user_name:"",
          user_email:"",
          },
          validationSchema:schema,
          
        })
        

    return(
        <>
         <div className="contact-page">
      <div className="contact-content">
        <h2 className="text-center">Contact Us</h2>
         <p className="text-center">Have questions or feedback? We would love to hear from you.</p>

        <form className="contact-form">
            <input onChange={handleChange} value={values.user_name} id="user_name" type="text" placeholder="Name" />
            {errors.user_name && touched.user_name}<small className="text-danger">{errors.user_name}</small>
            <input onChange={handleChange} value={values.user_email} id="user_email" type="email" placeholder="Email" />
            {errors.user_email && touched.user_email}<small className="text-danger text-left">{errors.user_email}</small>

            <textarea placeholder="Message" rows="4"></textarea>
            <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
      </div>
    </div>
 
        </>
    )
}

export default Contact;