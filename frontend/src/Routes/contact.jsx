
import * as yup from 'yup';

import { useFormik } from 'formik';


const Contact = () =>{


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
         <div className="contact-page row "  style={{paddingTop:"80px"}}>
      <img src="/contact.svg" className="col picture" width="600" height="600"/>

      <div className="contact-content col">
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